import pg from 'pg';

const connString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/MyDiary';

const client = new pg.Client(connString);
client.connect()
  .then(() => console.log('database successfully connected'))
  .catch(error => console.log({ error }));
const SQLCODE = 'CREATE TABLE users(userId SERIAL PRIMARY KEY, Name VARCHAR(40) not null, Username VARCHAR(40) not null unique, Password VARCHAR(40) not null, Email VARCHAR(40) not null unique)';
const query = client.query(SQLCODE);
query.then(() => {
  console.log('users table successfully created');
  client.end();
  console.log('database successfully disconnected');
});
