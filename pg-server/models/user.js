import { pool } from '../db/index';

pool.connect();

const SQLCODE = 'CREATE TABLE users(userId SERIAL PRIMARY KEY, Name VARCHAR(40) not null, Username VARCHAR(40) not null unique, Password VARCHAR(40) not null, Email VARCHAR(40) not null unique)';
const query = pool.query(SQLCODE);
query
  .then(() => {
    console.log('users table successfully created');
    pool.end();
    console.log('database successfully disconnected');
  })
  .catch(error => console.log(error));
