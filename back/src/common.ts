export const CLIENT_ID = '22CDGB';
export const CLIENT_SECRET = 'b891b07bfed49c9d8f5a2d2ad2831a78';

export const fitbitHeaderAppAuthorization = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
).toString('base64');
