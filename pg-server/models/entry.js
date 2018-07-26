import pg from "pg";

const connString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/MyDiary";

const client = new pg.Client(connString);
client.connect()
  .then(() => console.log("database successfully connected"))
  .catch(() => console.log({ error: 'an error occured when trying to connect to database' }));
const ENUMTYPE = "CREATE TYPE entryType AS ENUM ('todo', 'history')";
const SQLCODE = "CREATE TABLE entries(entryId SERIAL PRIMARY KEY, Title VARCHAR(40) not null, Entry TEXT not null, Time created_at TIMESTAMPTZ NOT NULL DEFAULT NOW() type entryType, diaryId INT, FOREIGN KEY (diaryId) REFERENCES diaries (diaryId))";
let query = client.query(ENUMTYPE);
query
  .then(() => {
    console.log("enum type with todo or history options created with success");
  })
  .catch(console.log("an error occured when creating enum type"));
query = client.query(SQLCODE);
query
  .then(() => {
    console.log("entries table successfully created");
    client.end();
    console.log("database successfully disconnected");
  })
  .catch(() => console.log("an error occured when trying to create entries table"));
