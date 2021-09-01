import dotenv from 'dotenv';

dotenv.config();

export const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  userDB: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  DB: process.env.MYSQL_DB || 'none_db',
  host: process.env.MYSQL_HOST || 'localhost',
};
