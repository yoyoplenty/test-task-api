import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  port: process.env.PORT || 4030,
  mongoUri: process.env.MONGO_URI,
  app: {
    baseUrl: process.env.BASE_URL,
    verificationBaseUrl: process.env.VERIFICATION_BASE_URL,
  },
  email: {
    defaultFrom: process.env.EMAIL_DEFAULT_FROM,
  },
  jwt: {
    secret: process.env.JWT_KEY,
    expiresIn: process.env.JWT_EXPIRY_DATE,
    saltOrRounds: Number(process.env.JWT_SALT),
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
