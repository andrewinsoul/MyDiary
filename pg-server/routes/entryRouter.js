import express from 'express';
import entryHandler from '../controllers/entry';
import validateUserResource from '../middlewares/validateUserResource';
import appMiddleware from '../middlewares/appMiddleware';

const entryRouter = express.Router();

entryRouter
  .post('/entries', [appMiddleware.verifyToken, validateUserResource, entryHandler.addEntry]);
export default entryRouter;
