import express from "express";
import {
  getLogIn,
  registrationUser,
  getAuth,
  logOut,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post('/login',getLogIn);
userRouter.get('/login', getAuth);
userRouter.post('/logout',logOut);
userRouter.post('/registration', registrationUser);

export default userRouter;