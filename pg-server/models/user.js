import { pool } from '../db/index';

pool.connect();

export default class userModelClass {
  static createTable() {
    const SQLCODE = 'CREATE TABLE users(userId SERIAL PRIMARY KEY, Name VARCHAR(40) not null, Username VARCHAR(40) not null unique, Password VARCHAR(40) not null, Email VARCHAR(40) not null unique)';
    const query = pool.query(SQLCODE);
    query
      .then(() => {
        console.log('users table successfully created');
        pool.end();
        console.log('database successfully disconnected');
      })
      .catch(error => console.log(error));
  }

  static dropTable() {
    const query = pool.query("DROP TABLE users");
    query
      .then(() => console.log('users table successfully dropped'))
      .catch(error => console.log(error.name, 'could not drop table'));
  }
}
