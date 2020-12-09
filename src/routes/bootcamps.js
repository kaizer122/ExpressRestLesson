import express from "express";
import * as Controller from "../controllers/bootcamps";
const bootcampsRouter = express.Router();

bootcampsRouter
  .route("/")
  .get(Controller.getBootcamps)
  .post(Controller.addBootcamp);

export default bootcampsRouter;
