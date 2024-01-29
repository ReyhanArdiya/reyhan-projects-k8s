import Song from "../models/song.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";


const renderHome = async (req, res) => {
	const { comments, favorites } = await User.findById(req.user._id)
		.populate("favorites")
		.populate({
			path     : "comments",
			populate : { path : "song" }
		});

	const err = req.flash("error");
	res.render("user", {
		comments,
		err,
		favorites
	});
};

const addFavorite = async (req, res, next) => {
	try {
		const { id } = req.params;
		const song = await Song.findById(id);
		await User.findByIdAndUpdate(
			req.user._id,
			{ $addToSet : { favorites : song } }
		);
		res.end();
	} catch (err) {
		next(err);
	}
};

const deleteFavorite = async (req, res, next) => {
	try {
		const { id } = req.params;
		await User.findByIdAndUpdate(
			req.user._id,
			{ $pull : { favorites : id } },
			{ new : true }
		);
		res.end();
	} catch (err) {
		next(err);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.user._id);
		// TODO flash message here later
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

const deleteProfilePicture = async (req, res, next) => {
	try {
		if (req.user.profile.filename) {
			await cloudinary.uploader.destroy(req.user.profile.filename);
		}
		next();
	} catch (err) {
		next(err);
	}
};

const uploadProfilePicture = async (req, res, next) => {
	try {
		const { path, filename } = req.file;
		await User.findByIdAndUpdate(req.user._id, {
			profile : {
				filename,
				path,
			}
		});
		res.send(req.file);
	} catch (err) {
		next(err);
	}
};

const userController = {
	addFavorite,
	deleteFavorite,
	deleteProfilePicture,
	deleteUser,
	renderHome,
	uploadProfilePicture,
};

export default userController;