import express from "express";
import {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.put("/profile", updateProfile);

export default userRouter;
