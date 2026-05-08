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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_DOCUMENT_SIZE_BYTES = exports.MAX_IMAGE_SIZE_BYTES = exports.ALLOWED_DOCUMENT_MIME_TYPES = exports.ALLOWED_IMAGE_MIME_TYPES = void 0;
exports.imageUploadOptions = imageUploadOptions;
exports.documentUploadOptions = documentUploadOptions;
const common_1 = require("@nestjs/common");
const multer = __importStar(require("multer"));
// ─── Constants ────────────────────────────────────────────────────────────────
exports.ALLOWED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
];
exports.ALLOWED_DOCUMENT_MIME_TYPES = [
    'application/pdf',
];
/** 5 MB in bytes */
exports.MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
/** 10 MB in bytes */
exports.MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;
// ─── Filter Factories ─────────────────────────────────────────────────────────
function createFileFilter(allowed) {
    return (_req, file, callback) => {
        if (!allowed.includes(file.mimetype)) {
            return callback(new common_1.BadRequestException(`Invalid file type. Allowed types: ${allowed.join(', ')}`), false);
        }
        callback(null, true);
    };
}
// ─── Config Factories ─────────────────────────────────────────────────────────
/**
 * Multer config for image uploads (avatar, thumbnail).
 * Accepts JPEG, PNG, WebP, GIF — max 5 MB.
 */
function imageUploadOptions(maxSizeBytes = exports.MAX_IMAGE_SIZE_BYTES) {
    return {
        storage: multer.memoryStorage(),
        fileFilter: createFileFilter(exports.ALLOWED_IMAGE_MIME_TYPES),
        limits: { fileSize: maxSizeBytes },
    };
}
/**
 * Multer config for document uploads (CV PDF).
 * Accepts PDF only — max 10 MB.
 */
function documentUploadOptions(maxSizeBytes = exports.MAX_DOCUMENT_SIZE_BYTES) {
    return {
        storage: multer.memoryStorage(),
        fileFilter: createFileFilter(exports.ALLOWED_DOCUMENT_MIME_TYPES),
        limits: { fileSize: maxSizeBytes },
    };
}
//# sourceMappingURL=multer.config.js.map