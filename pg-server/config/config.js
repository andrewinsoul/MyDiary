import pg from 'pg';
import connString from '../db/index';

const env = process.env.NODE_ENV || 'development';
let client;
if (process.env.NODE_ENV === 'production') {
  client = new pg.Client(connString.production.DATABASE_URL);
}
else {
  client = new pg.Client(connString[env]);
}
client.connect()
  .then(() => console.log('database successfully connected'))
  .catch(error => console.log({ error }));
export default client;
