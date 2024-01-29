import { checkLogin } from "../utils/middleware.js";
import express from "express";
import imageParser from "../controllers/multer-cloudinary.js";
import userController from "../controllers/user.js";

const userRouter = express.Router({ mergeParams : true });

userRouter.use(checkLogin);

userRouter.post(
	"/profile",
	imageParser.single("img"),
	userController.deleteProfilePicture,
	userController.uploadProfilePicture
);

userRouter.delete("/", userController.deleteUser);

userRouter.get("/home", userController.renderHome);

export default userRouter;