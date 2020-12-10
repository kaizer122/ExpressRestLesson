import bcrypt from "bcryptjs";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/User";
import ErrorResponse from "../utils/ErrorResponse";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;
  // Validate name & email & password
  if (!name || !email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  const user = await new User({ email, name, password }).save();
  sendTokenResponse(user, 200, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await confirmPassword(password, user);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = getSignedJwtToken(user);

  res.status(statusCode).json({
    success: true,
    token,
    data: user,
  });
};

const confirmPassword = async (password, user) =>
  await bcrypt.compare(password, user.password);

const getSignedJwtToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
