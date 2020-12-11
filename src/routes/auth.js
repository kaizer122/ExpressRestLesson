import express from "express";
import * as Controller from "../controllers/auth";
const AuthRouter = express.Router();

AuthRouter.route("/register").post(Controller.register);

AuthRouter.route("/login").post(Controller.login);

export default AuthRouter;
