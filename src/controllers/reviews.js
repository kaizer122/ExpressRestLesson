import asyncHandler from "../middleware/asyncHandler";
import Review from "../models/Review";
import ErrorResponse from "../utils/ErrorResponse";

export const getReviews = asyncHandler(async (req, res, next) => {
  const { bootcamp } = req.params;
  // Validate name & email & password
  if (!bootcamp) {
    return next(new ErrorResponse("Please provide a bootcamp", 400));
  }
  const reviews = await Review.find({ bootcamp })
    .sort({ createdAt: -1 })
    .populate("creator")
    .lean();
  res.status(200).send({ success: true, data: reviews });
});

export const addReview = asyncHandler(async (req, res, next) => {
  const { bootcamp } = req.params;
  const { text = "", rating = 3 } = req.body;

  if (!bootcamp) {
    return next(new ErrorResponse("Please provide a bootcamp", 400));
  }
  if (String(text).trim() === "") {
    return next(new ErrorResponse("Please provide a review description", 400));
  }
  const review = await new Review({
    bootcamp,
    text,
    creator: req.user._id,
    rating,
  }).save();
  res.status(200).send({ success: true, data: review });
});
