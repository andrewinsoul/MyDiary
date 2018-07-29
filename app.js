import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import YAML from 'yamljs';
import ExpressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import sqlCode from './pg-server/sql/sqlObject';
import userRoute from './pg-server/routes/userRouter';
import diaryRoute from './pg-server/routes/diaryRouter';
import client from './pg-server/config/config';

let query = client.query(sqlCode.CreateUserTable);
query.then(() => console.log('users table successfully created'));
query = client.query(sqlCode.CreateDiaryTable);
query.then(() => console.log('diary table created successfully'));
query = client.query(sqlCode.CreateEntryTable);
query.then(() => console.log('entries table successfully created'));

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(logger('dev'));
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ExpressValidator());
app.use('/api/v1/', userRoute);
app.use('/api/v1/', diaryRoute);
app.get('/', (req, res) => res.status(200).send({ message: 'welcome to MyDiary API' }));
app.get('*', (req, res) => res.redirect(302, '/api/v1/api-docs'));

const port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, () => console.log(`server live on port ${port}`));
export default app;
