import express from "express";
import * as Controller from "../controllers/reviews";
import { protect } from "../middleware/auth";
const reviewsRouter = express.Router();

reviewsRouter
  .route("/:bootcamp")
  .get(Controller.getReviews)
  .post(protect, Controller.addReview);

export default reviewsRouter;
