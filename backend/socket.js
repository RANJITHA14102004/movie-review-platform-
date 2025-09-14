// backend/socket.js
const socketIo = require("socket.io");

let io;
const initSocket = (server) => {
  io = socketIo(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("joinUserRoom", (userId) => {
      socket.join(userId); // user-specific room
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

const notifyNewReview = (userId, review) => {
  if (io) {
    io.to(userId).emit("newReview", review);
  }
};

module.exports = { initSocket, notifyNewReview };
