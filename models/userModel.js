const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Add a name"],
    },
    password: {
      type: String,
      required: [true, "Add a password"],
    },
    // isAdmin: {
    //   type: Boolean,
    //   require: true,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
