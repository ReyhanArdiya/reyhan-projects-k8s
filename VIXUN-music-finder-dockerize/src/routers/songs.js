import { addLastVisitedToSes } from "../utils/middleware.js";
import commentsRouter from "./comments.js";
import express from "express";
import favoriteRouter from "./favorite.js";
import songsController from "../controllers/songs.js";

const songsRouter = express.Router();
songsRouter.use(express.urlencoded({ extended : true }));

songsRouter.get("/", songsController.querySongs);

songsRouter.get("/top", songsController.sendTopHits);

songsRouter.use("/:id/comments", commentsRouter);

songsRouter.use("/:id/favorite", favoriteRouter);

songsRouter.route("/:id")
	.get(addLastVisitedToSes, songsController.getASong)
	.delete(
		songsController.isAdmin,
		songsController.deleteSong
	);

export default songsRouter;