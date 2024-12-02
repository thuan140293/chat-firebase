const { createRoom } = require("../services/roomService");
const { addMembersToRoom } = require("../services/roomService");
const { getRoomDetails } = require("../services/roomService");

const createChatRoom = async (socket, data) => {
    const { name, createdBy, members } = data;

    try {
        if (!name || !createdBy) {
            socket.emit('error', { error: "Room name and createdBy are required" });
            return;
        }

        const room = await createRoom(name, createdBy, members);
        socket.emit('roomCreated', room); // Emit to the creator
    } catch (error) {
        socket.emit('error', { error: error.message });
    }
};

const inviteToRoom = async (socket, data) => {
    const { roomId, newMembers } = data;

    try {
        if (!roomId || !newMembers || !newMembers.length) {
            socket.emit('error', { error: "roomId and newMembers are required" });
            return;
        }

        const updatedMembers = await addMembersToRoom(roomId, newMembers);
        socket.emit('membersUpdated', { members: updatedMembers });
        socket.to(roomId).emit('membersUpdated', { members: updatedMembers }); // Broadcast to the room
    } catch (error) {
        socket.emit('error', { error: error.message });
    }
};

const fetchRoomDetails = async (socket, roomId) => {
    try {
        const roomDetails = await getRoomDetails(roomId);
        socket.emit('roomDetails', roomDetails);
    } catch (error) {
        socket.emit('error', { error: error.message });
    }
};

module.exports = { createChatRoom, inviteToRoom, fetchRoomDetails };
