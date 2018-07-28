import pg from 'pg';
import connString from '../db/index';

const client = new pg.Client(connString);
client.connect()
  .then(() => console.log('database successfully connected'))
  .catch(error => console.log({ error }));
export default client;
