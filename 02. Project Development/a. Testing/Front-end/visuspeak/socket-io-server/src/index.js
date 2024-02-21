import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid username"));
  }

  socket.username = username;
  socket.userId = uuidv4();
  next();
});

io.on("connection", async (socket) => {
    //all connected users

  //connected user details
  socket.emit("session", { userId: socket.userId, username: socket.username });
});

console.log("listening to port from socket.io...");

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT);
