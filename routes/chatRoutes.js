const express = require("express");
const { sendChatMessage, fetchChatMessages } = require("../controllers/chatController");
const { createChatRoom, inviteToRoom, fetchRoomDetails } = require("../controllers/roomController");
const router = express.Router();

router.post("/send", sendChatMessage);
router.get("/chatList/:id", fetchChatMessages);
router.post("/createRoom", createChatRoom);
router.post("/inviteToRoom", inviteToRoom);
router.get("/room/:id", fetchRoomDetails);

module.exports = router;
