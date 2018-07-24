import express from 'express';
import userHandler from '../controllers/userController';
import validateUserResource from '../middlewares/validateFunction';
import appMiddleware from '../middlewares/helperClass';

const userRouter = express.Router();

userRouter.post('/user', [validateUserResource, appMiddleware.addUserMiddleware, userHandler.addUser]);
userRouter.post('/login', [validateUserResource, userHandler.loginUser]);
export default userRouter;
