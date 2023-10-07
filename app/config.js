import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  database: process.env.DATABASE,
};
