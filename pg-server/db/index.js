import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'MyDiary',
  password: 'postgres',
  port: 5432,
});
const queryObject = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res.rowCount });
      callback(err, res);
    });
  },
};
export default queryObject;
