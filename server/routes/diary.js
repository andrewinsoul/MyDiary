import express from 'express';
import diaryHandler from '../controllers/diaryController';
import validateUserInput from '../middlewares/validateFunction';
import appMiddleware from '../middlewares/helperClass';

const diaryRouter = express.Router();
diaryRouter
  .post('/diary', [validateUserInput, appMiddleware.checkUserIndex, appMiddleware.addDiaryMiddleware, diaryHandler.createDiary])
  .delete('/diary/:id', diaryHandler.deleteDiary);

export default diaryRouter;
