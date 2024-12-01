const { registerUser, loginUser, getUserDetails } = require("../services/userService");

const register = async (req, res) => {
  const { email, password, displayName } = req.body;
  try {
    const user = await registerUser(email, password, displayName);
    res.status(201).json({
      uid: user.uid,
      email: user.email,
      displayName: displayName || "",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await loginUser(email, password);

    // Fetch user details from Firestore
    // const userDetails = await getUserDetails(user.uid);

    res.status(200).json({
      uid: user.uid,
      email: user.email,
      // displayName: userDetails.displayName,
      // createdAt: userDetails.createdAt,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  const uid = req.params.uid; // Assuming UID is passed as a URL parameter
  try {
    const userDetails = await getUserDetails(uid);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, getUserInfo };
