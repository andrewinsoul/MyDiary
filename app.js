import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(() => console.log(`server live on port ${port}`));
