import Song from "../models/song.js";
import { aggregatorAPIs } from "./request-songs/song-aggregator/index.js";
import requestSongs from "./request-songs/index.js";

const querySongs = async (req, res, next) => {
	try {
		let songs;

		if (req.query.q) {
			songs = await requestSongs(req.query.q);
		} else {
			const count = await Song.estimatedDocumentCount();
			let random = Math.floor(Math.random() * (count - 14));
			if (random < 0) {
				random = 0;
			}
			songs = await Song.find()
			                     .skip(random)
			                     .limit(15);
		}

		res.send(songs.length ? songs : null);
	} catch (err) {
		next(err);
	}
};

const sendTopHits = async (req, res, next) => {
	try {
		const topSongs = await aggregatorAPIs.deezer.searchDeezerChart("/");
		res.send(topSongs);
	} catch (err) {
		next(err);
	}
};

const getASong = async (req, res, next) => {
	const { headers: { accept }, params: { id } } = req;
	try {
		const song = await Song.findById(id).populate({
			path     : "comments",
			populate : { path : "user" }
		});

		res.setHeader("Vary", "Accept");
		if (accept === "application/json") {
			res.send(song);
		} else {
			if (!song) {
				const noSongErr = new Error("Song not found! :(");
				noSongErr.name = "NoSongError";
				throw noSongErr;
			}

			const err = req.flash("error");
			res.render("song", {
				err,
				song
			});
		}
	} catch (err) {
		next(err);
	}
};

const isAdmin = async (req, res, next) => {
	try {
		req.user?.isAdmin ? next() : res.redirect("/auth/login");
	} catch (err) {
		next(err);
	}
};

const deleteSong = async (req, res, next) => {
	try {
		await Song.findByIdAndDelete(req.params.id);
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

const songsController = {
	deleteSong,
	getASong,
	isAdmin,
	querySongs,
	sendTopHits
};

export default songsController;