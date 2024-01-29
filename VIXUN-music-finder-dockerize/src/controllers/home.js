import Song from "../models/song.js";

const render = async (req, res, next) => {
	try {
		const count = await Song.estimatedDocumentCount();
		let randomArt = Math.floor(Math.random() * (count - 29));
		if (randomArt < 0) {
			randomArt = 0;
		}
		const artistsCol = await Song.find()
			                       .skip(randomArt)
			                       .limit(30);
		const artists = artistsCol.filter((artist, currentI, arr) => {
			const foundI = arr.findIndex(a => a.artist === artist.artist);

			return currentI === foundI;
		});
		const err = req.flash("error");
		res.render("home", {
			artists,
			err
		});
	} catch (err) {
		next(err);
	}
};

const homeController = { render };

export default homeController;