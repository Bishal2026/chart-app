import { Server } from "socket.io";
import { createServer } from "http";

// import app from "../app.js";
import express from "express";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReciverSocketId = (reciverId) => {
  return userSocketMap[reciverId];
};
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("socket connect: ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { server, io, app };
