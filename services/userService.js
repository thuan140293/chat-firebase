const { auth, db } = require("../configs/firebase");
const { doc, setDoc, getDoc } = require("firebase/firestore");
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");

// Register user and save to Firestore
const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user details to Firestore (exclude password)
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
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
    const user = userCredential.user;

    // Retrieve the ID token
    const token = await user.getIdToken();
    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch user details from Firestore
const getUserDetails = async (uid) => {
  try {
    if (!uid) {
      throw new Error("Invalid UID");
    }

    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    return userDoc.data();
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw new Error(error.message);
  }
};


module.exports = { registerUser, loginUser, getUserDetails };
