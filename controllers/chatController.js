const { sendMessage } = require("../services/chatService");
const { getMessages } = require("../services/chatService");

const sendChatMessage = async (req, res) => {
  const { chatId, sender, message } = req.body;

  try {
    if (!chatId || !sender || !message) {
      return res.status(400).json({ error: "chatId, sender, and message are required" });
    }

    const newMessage = await sendMessage(chatId, sender, message);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchChatMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    if (!chatId) {
      return res.status(400).json({ error: "chatId is required" });
    }

    const messages = await getMessages(chatId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendChatMessage, fetchChatMessages };
