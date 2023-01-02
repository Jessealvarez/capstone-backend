const express = require("express");
//mergeParams -> used in ticketRoutes
const router = express.Router({ mergeParams: true });
const { getNotes, createNote } = require("../controllers/noteController");

const { authenticate } = require("../middleware/authMiddle");

router.route("/").get(authenticate, getNotes).post(authenticate, createNote);
module.exports = router;
