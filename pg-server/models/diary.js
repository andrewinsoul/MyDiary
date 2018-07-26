import { pool } from '../db/index';

pool.connect();

export default class diaryNodelClass {
  static createTable() {
    let query;
    const ENUMTYPE = "CREATE TYPE diaryType AS ENUM ('private', 'public')";
    const SQLCODE = "CREATE TABLE diaries(diaryId SERIAL PRIMARY KEY, Name VARCHAR(40) not null, Description VARCHAR(40) not null, type diaryType, userId INT, FOREIGN KEY (userId) REFERENCES users (userId))";
    query = pool.query(ENUMTYPE);
    query
      .then(() => {
        console.log("enum type with private or public options created with success");
      })
      .then(() => {
        query = pool.query(SQLCODE);
        console.log('diaries table successfully created');
        pool.end();
        console.log('database successfully disconnected');
        return 0;
      })
      .catch(error => console.log(error.name, "an error occured when creating enum table and enum type"));
  }

  static dropTable() {
    const query = pool.query("DROP TABLE diaries");
    query
      .then(() => console.log('diaries table successfully dropped'))
      .catch(error => console.log(error.name, 'could not drop table'));
  }
}
