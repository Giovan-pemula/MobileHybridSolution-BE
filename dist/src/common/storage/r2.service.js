"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var R2Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.R2Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
let R2Service = R2Service_1 = class R2Service {
    configService;
    logger = new common_1.Logger(R2Service_1.name);
    s3;
    bucketName;
    publicUrl;
    constructor(configService) {
        this.configService = configService;
        const accountId = this.configService.getOrThrow('R2_ACCOUNT_ID');
        const accessKeyId = this.configService.getOrThrow('R2_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.getOrThrow('R2_SECRET_ACCESS_KEY');
        this.bucketName = this.configService.getOrThrow('R2_BUCKET_NAME');
        this.publicUrl = this.configService.getOrThrow('R2_PUBLIC_URL');
        this.s3 = new client_s3_1.S3Client({
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
    async uploadFile(file, folder = 'uploads') {
        const ext = path.extname(file.originalname).toLowerCase();
        const key = `${folder}/${(0, uuid_1.v4)()}${ext}`;
        const params = {
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentLength: file.size,
        };
        try {
            await this.s3.send(new client_s3_1.PutObjectCommand(params));
            const fileUrl = `${this.publicUrl}/${key}`;
            this.logger.log(`File uploaded successfully: ${fileUrl}`);
            return fileUrl;
        }
        catch (error) {
            this.logger.error('Failed to upload file to R2', error);
            throw new common_1.InternalServerErrorException('Failed to upload file. Please try again.');
        }
    }
    /**
     * Delete a file from Cloudflare R2 by its public URL.
     * @param fileUrl - The public URL of the file to delete
     */
    async deleteFile(fileUrl) {
        try {
            // Extract the key from the public URL
            const key = fileUrl.replace(`${this.publicUrl}/`, '');
            await this.s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            }));
            this.logger.log(`File deleted successfully: ${key}`);
        }
        catch (error) {
            this.logger.error('Failed to delete file from R2', error);
            throw new common_1.InternalServerErrorException('Failed to delete file. Please try again.');
        }
    }
};
exports.R2Service = R2Service;
exports.R2Service = R2Service = R2Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], R2Service);
//# sourceMappingURL=r2.service.js.map