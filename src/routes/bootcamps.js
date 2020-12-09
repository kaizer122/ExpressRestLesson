import express from "express";
import * as Controller from "../controllers/bootcamps";
const bootcampsRouter = express.Router();

bootcampsRouter
  .route("/")
  .get(Controller.getBootcamps)
  .post(Controller.addBootcamp);

bootcampsRouter
  .route("/:id")
  .put(Controller.updateBootcamp)
  .delete(Controller.deleteBootcamp);

export default bootcampsRouter;
