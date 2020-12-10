import express from "express";
import * as Controller from "../controllers/bootcamps";
import { authorize, protect } from "../middleware/auth";
const bootcampsRouter = express.Router();

bootcampsRouter
  .route("/")
  .get(Controller.getBootcamps)
  .post(protect, Controller.addBootcamp);

bootcampsRouter
  .route("/:id")
  .put(protect, authorize(["admin"]), Controller.updateBootcamp).deleteprotect,
  Controller.deleteBootcamp;

export default bootcampsRouter;
