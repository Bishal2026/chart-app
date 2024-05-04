import { Server } from "socket.io";
import { createServer } from "http";

import app from "../app.js";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("socket connect: ", socket.id);
});

export { server, io };
