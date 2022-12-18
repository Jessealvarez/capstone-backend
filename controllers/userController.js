const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//Registers new user
//Route = /api/users!
//Public access - no token necessary to acces.

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, password } = req.body;
  //Let's validate the data
  if (!name || !password) {
    res.status(400);
    throw new Error("Please include both fields.");
  }
  //if name and password already exist
  const userExists = await User.findOne({ name });
  if (userExists) {
    res.status(400);
    throw new Error("User exists.");
  }

  //hash password
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create the user
  const user = await User.create({
    name,
    password: hashedPassword,
  });

  if (User) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  //use bcyrpt compare to check if user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
});

//admin function to find out who is using this now..me!
const getAdmin = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
  };
  res.status(200).json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "14d" });
};

module.exports = {
  registerUser,
  loginUser,
  getAdmin,
  User,
};
