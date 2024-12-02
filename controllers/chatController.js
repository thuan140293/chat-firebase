const { sendMessage } = require("../services/chatService");
const { getMessages } = require("../services/chatService");

const sendChatMessage = async (socket, data) => {
  const { chatId, sender, message } = data;

  try {
    if (!chatId || !sender || !message) {
      socket.emit('error', { error: "chatId, sender, and message are required" });
      return;
    }

    const newMessage = await sendMessage(chatId, sender, message);
    socket.emit('messageSent', newMessage); // Emit to the sender
    socket.to(chatId).emit('newMessage', newMessage); // Broadcast to the room
  } catch (error) {
    socket.emit('error', { error: error.message });
  }
};

const fetchChatMessages = async (socket, chatId) => {
  try {
    if (!chatId) {
      socket.emit('error', { error: "chatId is required" });
      return;
    }

    const messages = await getMessages(chatId);
    socket.emit('chatMessages', messages);
  } catch (error) {
    socket.emit('error', { error: error.message });
  }
};

module.exports = { sendChatMessage, fetchChatMessages };
