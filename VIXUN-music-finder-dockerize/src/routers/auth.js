import authController from "../controllers/auth.js";
import express from "express";
import { goToLastVisited } from "../utils/middleware.js";
import passport from "passport";

const authRouter = express.Router({ mergeParams : true });

authRouter.use(express.urlencoded({ extended : true }));

authRouter.get("/", authController.sendCurrentUser);

authRouter.route("/register")
	.get(authController.renderRegister)
	.post(authController.registerUser);

authRouter.route("/login")
	.get(authController.renderLogin)
	.post(
		passport.authenticate(
			"local",
			{
				failureFlash    : true,
				failureRedirect : "/auth/login",
				successFlash    : true
			}
		),
		goToLastVisited
	);

authRouter.post("/logout", authController.logout);

export default authRouter;