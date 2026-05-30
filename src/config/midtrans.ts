import MidtransClient from 'midtrans-client';
import { env } from './env';

export const snap = new MidtransClient.Snap({
  isProduction: env.MIDTRANS_IS_PRODUCTION,
  serverKey: env.MIDTRANS_SERVER_KEY,
  clientKey: env.MIDTRANS_CLIENT_KEY,
});

export const coreApi = new MidtransClient.CoreApi({
  isProduction: env.MIDTRANS_IS_PRODUCTION,
  serverKey: env.MIDTRANS_SERVER_KEY,
  clientKey: env.MIDTRANS_CLIENT_KEY,
});
