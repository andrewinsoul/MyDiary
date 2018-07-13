import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import ExpressValidator from 'express-validator';
import userRouter from './server/routes/user';
import diaryRouter from './server/routes/diary';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ExpressValidator());
app.use('/api/v1', userRouter);
app.use('/api/v1', diaryRouter);

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => console.log(`server live on port ${port}`));
