import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import ExpressValidator from 'express-validator';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ExpressValidator());

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(() => console.log(`server live on port ${port}`));
