import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export declare const ALLOWED_IMAGE_MIME_TYPES: string[];
export declare const ALLOWED_DOCUMENT_MIME_TYPES: string[];
/** 5 MB in bytes */
export declare const MAX_IMAGE_SIZE_BYTES: number;
/** 10 MB in bytes */
export declare const MAX_DOCUMENT_SIZE_BYTES: number;
/**
 * Multer config for image uploads (avatar, thumbnail).
 * Accepts JPEG, PNG, WebP, GIF — max 5 MB.
 */
export declare function imageUploadOptions(maxSizeBytes?: number): MulterOptions;
/**
 * Multer config for document uploads (CV PDF).
 * Accepts PDF only — max 10 MB.
 */
export declare function documentUploadOptions(maxSizeBytes?: number): MulterOptions;
//# sourceMappingURL=multer.config.d.ts.map