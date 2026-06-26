import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import * as crypto from 'crypto';
import * as path from 'path';

@Injectable()
export class R2Service {
  private readonly logger = new Logger(R2Service.name);
  private readonly s3: S3Client;
  private readonly bucketName: string;
  private readonly publicUrl: string;

  constructor(private readonly configService: ConfigService) {
    const accountId = this.configService.getOrThrow<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.configService.getOrThrow<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.getOrThrow<string>('R2_SECRET_ACCESS_KEY');

    this.bucketName = this.configService.getOrThrow<string>('R2_BUCKET_NAME');
    this.publicUrl = this.configService.getOrThrow<string>('R2_PUBLIC_URL');

    this.s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'uploads'): Promise<string> {
    const ext = path.extname(file.originalname).toLowerCase();
    const key = `${folder}/${crypto.randomUUID()}${ext}`; 

    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
    };

    try {
      await this.s3.send(new PutObjectCommand(params));
      const fileUrl = `${this.publicUrl}/${key}`;
      this.logger.log(`File uploaded successfully: ${fileUrl}`);
      return fileUrl;
    } catch (error) {
      this.logger.error('Failed to upload file to R2', error);
      throw new InternalServerErrorException('Failed to upload file. Please try again.');
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const key = fileUrl.replace(`${this.publicUrl}/`, '');

      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: key,
        }),
      );

      this.logger.log(`File deleted successfully: ${key}`);
    } catch (error) {
      this.logger.error('Failed to delete file from R2', error);
      throw new InternalServerErrorException('Failed to delete file. Please try again.');
    }
  }
}