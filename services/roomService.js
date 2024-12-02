const { db } = require("../configs/firebase");

const createRoom = async (name, createdBy, members) => {
    try {
        const roomData = {
            name,
            createdBy,
            members: members || [createdBy],
            createdAt: new Date().toISOString(),
        };

        const roomRef = await db.collection("rooms").add(roomData);
        return { id: roomRef.id, ...roomData };
    } catch (error) {
        throw new Error("Error creating room: " + error.message);
    }
};

const addMembersToRoom = async (roomId, newMembers) => {
    try {
        const roomRef = db.collection("rooms").doc(roomId);

        // Get the existing room data
        const roomDoc = await roomRef.get();
        if (!roomDoc.exists) {
            throw new Error("Room not found");
        }

        const roomData = roomDoc.data();

        // Merge existing members with new members
        const updatedMembers = Array.from(new Set([...roomData.members, ...newMembers]));

        // Update Firestore
        await roomRef.update({ members: updatedMembers });

        return updatedMembers;
    } catch (error) {
        throw new Error("Error adding members to room: " + error.message);
    }
};

const getRoomDetails = async (roomId) => {
    try {
        const roomDoc = await db.collection("rooms").doc(roomId).get();

        if (!roomDoc.exists) {
            throw new Error("Room not found");
        }

        return { id: roomDoc.id, ...roomDoc.data() };
    } catch (error) {
        throw new Error("Error fetching room details: " + error.message);
    }
};

module.exports = { createRoom, addMembersToRoom, getRoomDetails };

