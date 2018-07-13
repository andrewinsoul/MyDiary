import express from 'express';
import entryHandler from '../controllers/entryController';
import validateUserInput from '../middlewares/validateFunction';

const entryRouter = express.Router();

entryRouter.post('/entries', [validateUserInput, entryHandler.createEntry]);

export default entryRouter;
