import express from 'express';
import diaryHandler from '../controllers/diaryController';
import validateUserInput from '../middlewares/validateFunction';
import appMiddleware from '../middlewares/helperClass';

const diaryRouter = express.Router();
diaryRouter
  .post('/diaries', [validateUserInput, appMiddleware.checkUserIndex, appMiddleware.addDiaryMiddleware, diaryHandler.createDiary])
  .delete('/diaries/:id', diaryHandler.deleteDiary);

export default diaryRouter;
