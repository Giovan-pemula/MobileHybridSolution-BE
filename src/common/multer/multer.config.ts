import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
export const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
];
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;
function createFileFilter(allowed: string[]): MulterOptions['fileFilter'] {
  return (_req, file, callback) => {
    if (!allowed.includes(file.mimetype)) {
      return callback(
        new BadRequestException(
          `Invalid file type. Allowed types: ${allowed.join(', ')}`,
        ),
        false,
      );
    }
    callback(null, true);
  };
}

export function imageUploadOptions(maxSizeBytes = MAX_IMAGE_SIZE_BYTES): MulterOptions {
  return {
    storage: multer.memoryStorage(),
    fileFilter: createFileFilter(ALLOWED_IMAGE_MIME_TYPES),
    limits: { fileSize: maxSizeBytes },
  };
}

export function documentUploadOptions(maxSizeBytes = MAX_DOCUMENT_SIZE_BYTES): MulterOptions {
  return {
    storage: multer.memoryStorage(),
    fileFilter: createFileFilter(ALLOWED_DOCUMENT_MIME_TYPES),
    limits: { fileSize: maxSizeBytes },
  };
}
