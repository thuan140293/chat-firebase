const { auth, db } = require("../configs/firebase");
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");

// Register user and save to Firestore
const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional details to Firestore
    await db.collection("users").doc(user.uid).set({
      email: user.email,
      displayName: displayName || "",
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch user details from Firestore
const getUserDetails = async (uid) => {
  try {
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    return userDoc.data();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerUser, loginUser, getUserDetails };
