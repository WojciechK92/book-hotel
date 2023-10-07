import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  database: process.env.DATABASE,
  sessionKeySecret: process.env.SESSION_KEY_SECRET
};
