import { goToLastVisited } from "./middleware.js";

/*  eslint-disable no-unused-vars */
const handleNotFound = (req, res) => {
	req.flash("error", "Not found :(");
	res.status(404);
	goToLastVisited(req, res);
};

const handleNoSong = (err, req, res, next) => {
	if (err.name === "NoSongError") {
		req.flash("error", err.message);
		res.redirect("/");
	} else {
		next(err);
	}
};

const handleSameUser = (err, req, res, next) => {
	if (err.name === "UserExistsError") {
		req.flash("error", err.message);
		res.redirect("/auth/register");
	} else {
		next(err);
	}
};

const handleCastError = (err, req, res, next) => {
	if (err.name === "CastError") {
		// TODO should i just make the req.flash error thingy its own middlware that runs before all other ones
		// Since it seems that every err h andler uses them
		req.flash("error", "Song not found :(");
		res.redirect("/");
	} else {
		next(err);
	}
};

const handleAnyError = (err, req, res, next) => {
	const {
		status = 500,
		message = "Something went wrong :("
	} = err;
	res.status(status).send(message);
};

const errHandlers = {
	handleAnyError,
	handleCastError,
	handleNoSong,
	handleNotFound,
	handleSameUser
};

export default errHandlers;