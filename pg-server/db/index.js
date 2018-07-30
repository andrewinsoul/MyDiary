import dotenv from 'dotenv';

dotenv.config();
const credential = {
  development: {
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  test: {
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.TEST_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};
export default credential;
