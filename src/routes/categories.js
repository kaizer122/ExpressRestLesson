var express = require("express");
import * as Controller from "../controllers/categories";
var CategoriesRouter = express.Router();

CategoriesRouter.route("/")
  .get(Controller.getCategories)
  .post(Controller.addCategory);

CategoriesRouter.route("/:id")
  .put(Controller.updateCategory)
  .delete(Controller.deleteCategory);

export default CategoriesRouter;
