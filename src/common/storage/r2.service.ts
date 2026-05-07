import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
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

  /**
   * Upload a file buffer to Cloudflare R2.
   * @param file      - The Multer file object (from memory storage)
   * @param folder    - Destination folder inside the bucket (e.g. 'avatars', 'thumbnails')
   * @returns         - Public URL of the uploaded file
   */
  async uploadFile(file: Express.Multer.File, folder: string = 'uploads'): Promise<string> {
    const ext = path.extname(file.originalname).toLowerCase();
    const key = `${folder}/${uuidv4()}${ext}`;

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

  /**
   * Delete a file from Cloudflare R2 by its public URL.
   * @param fileUrl - The public URL of the file to delete
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract the key from the public URL
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
