require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { sendChatMessage, fetchChatMessages } = require("./controllers/chatController");
const { createChatRoom, inviteToRoom, fetchRoomDetails } = require("./controllers/roomController");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log("A user connected");

  // Listen for sending chat messages
  socket.on('sendMessage', (data) => {
      sendChatMessage(socket, data);
  });

  // Listen for fetching chat messages
  socket.on('fetchMessages', (chatId) => {
      fetchChatMessages(socket, chatId);
  });

  // Listen for creating a chat room
  socket.on('createRoom', (data) => {
      createChatRoom(socket, data);
  });

  // Listen for inviting members to a room
  socket.on('inviteToRoom', (data) => {
      inviteToRoom(socket, data);
  });

  // Listen for fetching room details
  socket.on('fetchRoomDetails', (roomId) => {
      fetchRoomDetails(socket, roomId);
  });

  socket.on('disconnect', () => {
      console.log("A user disconnected");
  });
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", userRoutes);
app.use("/chat", chatRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
