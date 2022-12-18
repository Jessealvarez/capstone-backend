const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //let's get the token from that header
      token = req.headers.authorization.split(" ")[1];
      //use split to remove the space by turning data into an array and getting first item. verify token next
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //get user from token
      req.user = await User.findById(decode.id).select("-password"); //exclude password field from data that's returned for user
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new error("Not Authorized!!!!");
    }
  }

  if (!token) {
    res.status(401);
    throw new error("Not Authorized!!!!");
  }
});

module.exports = { authenticate };
