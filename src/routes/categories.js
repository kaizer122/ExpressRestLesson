import express from "express";
import * as Controller from "../controllers/categories";
import { authorize, protect } from "../middleware/auth";
const CategoriesRouter = express.Router();

CategoriesRouter.route("/")
  .get(Controller.getCategories)
  .post(protect, authorize(["admin"]), Controller.addCategory);

CategoriesRouter.route("/:id")
  .put(Controller.updateCategory)
  .delete(protect, authorize(["admin"]), Controller.deleteCategory);

export default CategoriesRouter;
