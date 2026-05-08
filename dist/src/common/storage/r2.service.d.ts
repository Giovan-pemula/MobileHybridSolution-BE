import { ConfigService } from '@nestjs/config';
export declare class R2Service {
    private readonly configService;
    private readonly logger;
    private readonly s3;
    private readonly bucketName;
    private readonly publicUrl;
    constructor(configService: ConfigService);
    /**
     * Upload a file buffer to Cloudflare R2.
     * @param file      - The Multer file object (from memory storage)
     * @param folder    - Destination folder inside the bucket (e.g. 'avatars', 'thumbnails')
     * @returns         - Public URL of the uploaded file
     */
    uploadFile(file: Express.Multer.File, folder?: string): Promise<string>;
    /**
     * Delete a file from Cloudflare R2 by its public URL.
     * @param fileUrl - The public URL of the file to delete
     */
    deleteFile(fileUrl: string): Promise<void>;
}
//# sourceMappingURL=r2.service.d.ts.map