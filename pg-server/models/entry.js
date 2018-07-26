import { pool } from '../db/index';

pool.connect();

let query;
const ENUMTYPE = "CREATE TYPE entryType AS ENUM ('todo', 'history')";
const SQLCODE = "CREATE TABLE entries(entryId SERIAL PRIMARY KEY, Title VARCHAR(40) not null, Entry TEXT not null, Time created_at TIMESTAMPTZ NOT NULL DEFAULT NOW() type entryType, diaryId INT, FOREIGN KEY (diaryId) REFERENCES diaries (diaryId))";
query = pool.query(ENUMTYPE);
query
  .then(() => {
    console.log("enum type with todo or history options created with success");
  })
  .then(() => {
    query = pool.query(SQLCODE);
    console.log("entries table successfully created");
    pool.end();
    console.log("database successfully disconnected");
  })
  .catch(error => console.log(error.name, "an error occured when creating enum type"));
