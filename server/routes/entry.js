import express from 'express';
import entryHandler from '../controllers/entryController';
import validateUserInput from '../middlewares/validateFunction';
import appMiddleware from '../middlewares/helperClass';

const entryRouter = express.Router();

entryRouter
  .post('/entry', [validateUserInput, appMiddleware.checkDiaryIndex, entryHandler.createEntry])
  .get('/entry/:id', entryHandler.getEntryById)
  .get('/entries', entryHandler.getAllEntries)
  .put('/entry/:id', [validateUserInput, appMiddleware.checkEntryIndex, entryHandler.modifyEntry]);

export default entryRouter;
