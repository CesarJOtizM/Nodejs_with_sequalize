import dotenv from 'dotenv';

dotenv.config();

export const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  userDB: process.env.USERDB || '',
  DB: process.env.DB || '',
  password: process.env.PASS || '',
};
