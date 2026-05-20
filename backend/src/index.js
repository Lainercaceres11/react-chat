import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { mongoConnection } from "./libs/mongo-connection.js";
import authRouter from "./routes/auth-route.js";
import messageRouter from "./routes/message-route.js";
import { server, app, io } from "./libs/socket.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

//routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

//static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await mongoConnection();

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server startup error:", error);
  }
};

startServer();
