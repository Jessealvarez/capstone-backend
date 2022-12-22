const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Ticket = require("../models/ticketModel")

//get the user's tickets
//@route -> GET /api/tickets
const getTickets = asyncHandler(async (req, res) => {
  //get user using ID in the JWT
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error("User not found :(")
  }

  const tickets = await Ticket.find(req.params.id)

 
  res.status(200).json(tickets)
  
});

//get a single ticket
//@route -> GET /api/tickets/:id
const getTicket = asyncHandler(async (req, res) => {
  //get user using ID in the JWT
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error("User not found :(")
  }

  const ticket = await Ticket.findOne({user: req.user.id})

   if(!ticket){
    res.status(404)
        throw newError("Ticket not found :(")
    
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("Not authorized. Only the user can view their tickets!")
  }
  res.status(200).json(ticket)
  
});


//@route POST /api/tickets
//user has to be logged in to be authorized 
const createTicket = asyncHandler(async (req, res) => {
    const {category, description} = req.body

    if(!category || !description) {
        res.status(400)
        throw new Error("Add a category and description!")
    }

     //get user using ID in the JWT
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error("User not found :(")
  }

  const ticket = await Ticket.create({
    category,
    description,
    user: req.user.id,
    status: "new"
  })
  
  res.status(201).json(ticket);
});

//delete a single ticket
//@route -> DELETE /api/tickets/:id
//admin access only
const deleteTicket = asyncHandler(async (req, res) => {
  //get user using ID in the JWT
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error("User not found :(")
  }

  const ticket = await Ticket.findOne({user: req.user.id})

   if(!ticket){
    res.status(404)
        throw newError("Ticket not found :(")
    
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("Not authorized. Only the user can view their tickets!")
  }

  await ticket.remove()
  res.status(200).json({Success: true})
  
});

//Update a  ticket
//@route -> PUT /api/tickets/:id
//admin access
const updateTicket = asyncHandler(async (req, res) => {
  //get user using ID in the JWT
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error("User not found :(")
  }

  const ticket = await Ticket.findOne({user: req.user.id})

   if(!ticket){
    res.status(404)
        throw newError("Ticket not found :(")
    
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error("Not authorized. Only the user can view their tickets!")
  }
  
  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true}) //if ticket isn't there, let's create it!
  res.status(200).json(updatedTicket)
  
});

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
}