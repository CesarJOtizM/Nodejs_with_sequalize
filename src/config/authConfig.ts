import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  secret: process.env.AUTH_SECRET || 'Ups',
  expires: process.env.AUTH_EXPIRES || '24h',
  rounds: process.env.AUTH_ROUNDS || 10,
};
