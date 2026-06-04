"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function signToken(payload, options = { expiresIn: env_1.env.JWT_EXPIRES_IN }) {
    if (!env_1.env.JWT_SECRET)
        throw new Error('JWT_SECRET is not set');
    return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, options);
}
function verifyToken(token) {
    if (!env_1.env.JWT_SECRET)
        throw new Error('JWT_SECRET is not set');
    return jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
}
function signRefreshToken(payload, options = { expiresIn: env_1.env.JWT_REFRESH_EXPIRES_IN }) {
    if (!env_1.env.JWT_REFRESH_SECRET)
        throw new Error('JWT_REFRESH_SECRET is not set');
    return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_REFRESH_SECRET, options);
}
function verifyRefreshToken(token) {
    if (!env_1.env.JWT_REFRESH_SECRET)
        throw new Error('JWT_REFRESH_SECRET is not set');
    return jsonwebtoken_1.default.verify(token, env_1.env.JWT_REFRESH_SECRET);
}
//# sourceMappingURL=jwt.js.map