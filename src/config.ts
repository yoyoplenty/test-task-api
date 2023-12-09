import * as dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  port: process.env.PORT || 4030,
  mongoUri: process.env.MONGO_URI,
};
