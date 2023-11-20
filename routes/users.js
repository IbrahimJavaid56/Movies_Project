import express from 'express';
import { addUser,signIn,verifyUser,addAdmin } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.post('/adduser',addUser);
userRouter.post('/signIn',signIn);
userRouter.get('/verify/:token',verifyUser);
userRouter.post('/addadmin',addAdmin);
export default userRouter;