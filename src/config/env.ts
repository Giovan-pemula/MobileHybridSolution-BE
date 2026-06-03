import 'dotenv/config';

export const env = {
  PORT: parseInt(process.env['PORT'] || '3000', 10),
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  JWT_SECRET: process.env['JWT_SECRET'] || '',
  DATABASE_URL: process.env['DATABASE_URL'] || '',
  R2_ACCOUNT_ID: process.env['R2_ACCOUNT_ID'] || '',
  R2_ACCESS_KEY_ID: process.env['R2_ACCESS_KEY_ID'] || '',
  R2_SECRET_ACCESS_KEY: process.env['R2_SECRET_ACCESS_KEY'] || '',
  R2_BUCKET_NAME: process.env['R2_BUCKET_NAME'] || '',
  R2_PUBLIC_URL: process.env['R2_PUBLIC_URL'] || '',
  MIDTRANS_SERVER_KEY: process.env['MIDTRANS_SERVER_KEY'] || '',
  MIDTRANS_CLIENT_KEY: process.env['MIDTRANS_CLIENT_KEY'] || '',
  MIDTRANS_IS_PRODUCTION: process.env['MIDTRANS_IS_PRODUCTION'] === 'true',
};
