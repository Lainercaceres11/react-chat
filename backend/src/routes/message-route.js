import { Router } from "express";
import { protectedRoute } from "../middlewares/auth-middleware.js";
import {
  getMessages,
  sendMessages,
  userForSidebar,
} from "../controllers/message-controller.js";

const messageRouter = Router();

messageRouter.get("/users", protectedRoute, userForSidebar);
messageRouter.get("/:id", protectedRoute, getMessages);
messageRouter.post("/send/:id", protectedRoute, sendMessages);

export default messageRouter;
