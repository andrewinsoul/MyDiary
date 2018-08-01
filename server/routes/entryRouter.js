import express from 'express';
import entryHandler from '../controllers/entry';
import validateUserResource from '../middlewares/validateUserResource';
import appMiddleware from '../middlewares/appMiddleware';

const entryRouter = express.Router();

entryRouter
  .post('/entries', [validateUserResource, appMiddleware.verifyToken, entryHandler.addEntry])
  .get('/entries', [appMiddleware.verifyToken, entryHandler.getAllEntry])
  .get('/entry/:entryId', [appMiddleware.verifyToken, entryHandler.getAnEntry])
  .put('/entries/:entryId', [validateUserResource, appMiddleware.verifyToken, entryHandler.modifyEntry]);
export default entryRouter;
