const express = require("express")
const router = express.Router()
const {getTickets, getTicket, createTicket, updateTicket, deleteTicket} = require("../controllers/ticketController")
const {authenticate} = require("../middleware/authMiddle")


//using .route to chain . options
//in order to get user's tickets, current user must be authenticated - or just logged in for this project
router.route("/").get(authenticate).post(authenticate, createTicket)
router.route("/:id").get(authenticate, getTicket).delete(authenticate, deleteTicket).put(authenticate, updateTicket)

module.exports = router