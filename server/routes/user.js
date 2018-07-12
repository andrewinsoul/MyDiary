import express from 'express';
import userHandler from '../controllers/userController';
import validateUserResource from '../middlewares/validateFunction';
import appMiddleware from '../middlewares/helperClass';

const userRouter = express.Router();

userRouter.post('/users', [validateUserResource, appMiddleware.addUserMiddleware, userHandler.addUser]);
export default userRouter;
