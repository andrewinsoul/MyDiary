import pg from "pg";

const connString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/MyDiary";

const client = new pg.Client(connString);
client.connect()
  .then(() => console.log("database successfully connected"))
  .catch(() => console.log({ error: 'an error occured when trying to connect to database' }));
const ENUMTYPE = "CREATE TYPE diaryType AS ENUM ('private', 'public')";
const SQLCODE = "CREATE TABLE diaries(diaryId SERIAL PRIMARY KEY, Name VARCHAR(40) not null, Description VARCHAR(40) not null, type diaryType, userId INT, FOREIGN KEY (userId) REFERENCES users (userId))";
let query = client.query(ENUMTYPE);
query
  .then(() => {
    console.log("enum type with private or public options created with success");
  })
  .catch(console.log("an error occured when creating enum type"));
query = client.query(SQLCODE);
query
  .then(() => {
    console.log("diaries table successfully created");
    client.end();
    console.log("database successfully disconnected");
  })
  .catch(() => console.log("an error occured when trying to create diaries table"));
