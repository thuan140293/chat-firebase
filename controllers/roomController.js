const { createRoom } = require("../services/roomService");
const { addMembersToRoom } = require("../services/roomService");
const { getRoomDetails } = require("../services/roomService");

const createChatRoom = async (req, res) => {
    const { name, createdBy, members } = req.body;

    try {
        if (!name || !createdBy) {
            return res.status(400).json({ error: "Room name and createdBy are required" });
        }

        const room = await createRoom(name, createdBy, members);
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const inviteToRoom = async (req, res) => {
    const { roomId, newMembers } = req.body;

    try {
        if (!roomId || !newMembers || !newMembers.length) {
            return res.status(400).json({ error: "roomId and newMembers are required" });
        }

        const updatedMembers = await addMembersToRoom(roomId, newMembers);
        res.status(200).json({ members: updatedMembers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const fetchRoomDetails = async (req, res) => {
    const { roomId } = req.params;

    try {
        const roomDetails = await getRoomDetails(roomId);
        res.status(200).json(roomDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createChatRoom, inviteToRoom, fetchRoomDetails };
