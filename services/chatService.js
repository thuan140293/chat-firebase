const { db } = require("../configs/firebase");

const sendMessage = async (chatId, sender, message) => {
    try {
        const chatRef = db.collection("chats").doc(chatId).collection("messages");
        const newMessage = {
            sender,
            message,
            timestamp: new Date().toISOString(),
        };

        await chatRef.add(newMessage);
        return newMessage;
    } catch (error) {
        throw new Error("Error sending message: " + error.message);
    }
};

const getMessages = async (chatId) => {
    try {
        const messages = [];
        const chatRef = db.collection("chats").doc(chatId).collection("messages").orderBy("timestamp");

        const snapshot = await chatRef.get();
        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });

        return messages;
    } catch (error) {
        throw new Error("Error fetching messages: " + error.message);
    }
};

module.exports = { sendMessage, getMessages };