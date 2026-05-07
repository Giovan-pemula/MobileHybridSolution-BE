import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

// ─── Constants ────────────────────────────────────────────────────────────────

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
];

/** 5 MB in bytes */
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

/** 10 MB in bytes */
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

// ─── Filter Factories ─────────────────────────────────────────────────────────

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

// ─── Config Factories ─────────────────────────────────────────────────────────

/**
 * Multer config for image uploads (avatar, thumbnail).
 * Accepts JPEG, PNG, WebP, GIF — max 5 MB.
 */
export function imageUploadOptions(maxSizeBytes = MAX_IMAGE_SIZE_BYTES): MulterOptions {
  return {
    storage: multer.memoryStorage(),
    fileFilter: createFileFilter(ALLOWED_IMAGE_MIME_TYPES),
    limits: { fileSize: maxSizeBytes },
  };
}

/**
 * Multer config for document uploads (CV PDF).
 * Accepts PDF only — max 10 MB.
 */
export function documentUploadOptions(maxSizeBytes = MAX_DOCUMENT_SIZE_BYTES): MulterOptions {
  return {
    storage: multer.memoryStorage(),
    fileFilter: createFileFilter(ALLOWED_DOCUMENT_MIME_TYPES),
    limits: { fileSize: maxSizeBytes },
  };
}
