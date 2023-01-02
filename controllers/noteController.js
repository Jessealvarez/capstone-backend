const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/notesmodel");
const Ticket = require("../models/ticketModel");

//get notes for a ticket
//GET /api/tickets/:ticketId/notes
//must be logged in
const getNotes = asyncHandler(async (req, res) => {
  //get user using ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found :(");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!!");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

//create ticket note
//POST /api/tickets/:ticketId/notes
//must be logged in
const createNote = asyncHandler(async (req, res) => {
  //get user using ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found :(");
  }

  //if user isn't same user/token, don't authorize
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!!");
  }

  const note = await Note.create({
    text: req.body.text,
    user: req.user.id,
    ticket: req.params.ticketId,
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  createNote,
};
