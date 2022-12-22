const mongoose = require("mongoose");

 //relate the ticket to user's object ID
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    category: {
      type: String,
      required: [true, "Select a category"],
      enum: ["Billing", "UI", "Character Stuck", "Item Recovery", "Other"]
    },
    description: {
      type: String,
      require: [true, "Please enter a description of the issue"],
      
    },
     status: {
      type: String,
      require: true,
      enum: ["new", "open", "closed" ],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);