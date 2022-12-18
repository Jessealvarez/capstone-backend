const express = require("express");
const router = express.Router()
const {
  registerUser,
  loginUser,
  getAdmin,
} = require("../controllers/userController");

const { authenticate } = require("../middleware/authMiddle");



router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/admin", authenticate, getAdmin);

module.exports = router;
