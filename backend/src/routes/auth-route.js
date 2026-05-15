import express from "express";
import {
  checkUser,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth-controller.js";
import { protectedRoute } from "../middlewares/auth-middleware.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update-profile", protectedRoute, updateProfile);
authRouter.get("/check", protectedRoute, checkUser);

export default authRouter;
