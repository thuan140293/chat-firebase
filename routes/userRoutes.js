const express = require("express");
const { register, login, getUserInfo } = require("../controllers/userController");

const router = express.Router();

// User routes
router.post("/register", register);
router.post("/login", login);
router.get("/getUserInfo/:uid", getUserInfo)

module.exports = router;