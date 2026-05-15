import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

export const getReceiverSocketId = (userId) => socketMap[userId];

const socketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    socketMap[userId] = socket.id;
  }

  io.emit("getUserOnline", Object.keys(socketMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket?.id);
    delete socketMap[userId];
    io.emit("getUserOnline", Object.keys(socketMap));
  });
});

export { io, app, server };
