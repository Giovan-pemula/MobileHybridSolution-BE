"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    PORT: parseInt(process.env['PORT'] || '3000', 10),
    NODE_ENV: process.env['NODE_ENV'] || 'development',
    JWT_SECRET: process.env['JWT_SECRET'] || '',
    DATABASE_URL: process.env['DATABASE_URL'] || '',
};
//# sourceMappingURL=env.js.map