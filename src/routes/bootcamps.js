import express from "express";
import * as Controller from "../controllers/bootcamps";
import { protect } from "../middleware/auth";
const bootcampsRouter = express.Router();

bootcampsRouter
  .route("/")
  .get(Controller.getBootcamps)
  .post(protect, Controller.addBootcamp);

bootcampsRouter
  .route("/:id")
  .get(Controller.getBootcamp)
  .put(protect, Controller.updateBootcamp)
  .delete(protect, Controller.deleteBootcamp);

export default bootcampsRouter;
