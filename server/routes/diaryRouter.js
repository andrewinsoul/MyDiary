import express from 'express';
import diaryHandler from '../controllers/diary';
import validateUserResource from '../middlewares/validateUserResource';
import appMiddleware from '../middlewares/appMiddleware';

const diaryRouter = express.Router();

diaryRouter
  .post('/diaries', [validateUserResource, appMiddleware.verifyToken, appMiddleware.addDiaryMiddleware, diaryHandler.createDiary]);
export default diaryRouter;
