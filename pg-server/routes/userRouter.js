import express from 'express';
import userHandler from '../controllers/user';
import validateUserResource from '../middlewares/validateUserResource';
import appMiddleware from '../middlewares/appMiddleware';

const userRouter = express.Router();

userRouter
  .post('/auth/signup', [validateUserResource, appMiddleware.addUserMiddleware, userHandler.createUser])
  .post('/auth/login', userHandler.loginUser);
export default userRouter;
