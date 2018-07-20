import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import YAML from 'yamljs';
import ExpressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import userRouter from './server/routes/user';
import diaryRouter from './server/routes/diary';
import entryRouter from './server/routes/entry';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(logger('dev'));
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ExpressValidator());
app.use('/api/v1', userRouter);
app.use('/api/v1', diaryRouter);
app.use('/api/v1', entryRouter);

app.get('/api/v1', (req, res) => {
  res.status(200).send('Welcome to MyDiary API');
});

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => console.log(`server live on port ${port}`));
export default app;
