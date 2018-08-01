import pg from 'pg';
import connString from '../db/index';

const env = process.env.NODE_ENV || 'development';

const client = new pg.Client(connString[env]);
client.connect()
  .then(() => console.log('database successfully connected'))
  .catch(error => console.log({ error }));
export default client;
