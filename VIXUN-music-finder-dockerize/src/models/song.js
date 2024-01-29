/*  eslint-disable jsdoc/require-returns-description*/
import Comment from "./comment.js";
import mongoose from "mongoose";
import User from "./user.js";

// eslint-disable-next-line
const nothingFound = (field, fieldArg, caseSensitive) => {
	throw new Error(
		`Nothing found from {${field} : ${fieldArg}} case ${caseSensitive ? "" : "in"}sensitive query`
	);
};

const SongExternalSchema = new mongoose.Schema({
	id : {
		default : null,
		type    : String
	},
	link : {
		default : null,
		type    : String
	},
	preview : {
		default : null,
		type    : String
	}
}, {
	_id    : false,
	strict : "throw"
});

// TODO change the schema here when our model is 100% fixed
/**
 * Type for instance of {@link Song}.
 *
 * @typedef {import("mongoose").Document & {
 * album: string
 * artist: string
 * image: string
 * price: number
 * title: string
 * release: number
 * }} SongDocument
 */
const SongSchema = new mongoose.Schema({
	album : {
		required : true,
		type     : String,
	},
	artist : {
		required : true,
		type     : String,
	},
	artistImage : String,
	comments    : [ {
		ref  : "Comment",
		type : mongoose.Schema.Types.ObjectId
	} ],

	/*  CMT I could make this as an array of externals instead and have each
	external have a source string prop. THis could be better (is it tho?) if i
	introduce more sources in the future but right now is YAGNI */
	externals : {
		amazonMusic : {
			default : {},
			type    : SongExternalSchema
		},
		deezer : {
			default : {},
			type    : SongExternalSchema
		},
		spotify : {
			default : {},
			type    : SongExternalSchema
		},
	},
	image : {
		required : true,
		type     : String,
	},
	matchCount : Number,
	price      : {
		default : null,
		type    : String
	},
	release : String,
	title   : {
		required : true,
		type     : String,
	},
}, { strict : "throw" });


SongSchema.post("findOneAndDelete", async function(song) {
	for (const comment of song.comments) {
		await Comment.findByIdAndDelete(comment);
	}

	const usersFaved = await User.find({ favorites : { $in : [ song._id ] } });
	for (const user of usersFaved) {
		await user.update({ $pull : { favorites : song._id } });
	}
});

/**
 * Returns a string array from splitting `str` in half.
 *
 * @param {string} str
 *
 * @returns {string[]} The halved `str`.
 *
 * @example
 * ```js
 * console.log(halveStr("The hours beach house"));
 * ```
 */
const halveStr = str => {
	str = str.trim();
	const splitedStr = str.split(" ");
	const pushOn = Math.round(splitedStr.length * 0.5);
	const result = [];

	let word = "";
	for (let i = 0; i < splitedStr.length; i++) {
		if (i >= pushOn && !(i % pushOn)) {
			result.push(word.trimEnd());
			word = "";
		}
		word += `${splitedStr[i]} `;
	}
	if (word !== "") {
		result.push(word.trimEnd());
	}

	return result;
};

/**
 * Returns a string array where each string item in `strArr` is halved using {@link halveStr}.
 *
 * @param {string[]} strArr
 *
 * @returns {string[] | false}
 * Either the halved `strArr` or `false` indicating nothing was halved.
 *
 * @example
 * ```
 * console.log(halveStrArr([ "The hours beach house bloom" ]));
 * console.log(halveStrArr([ "The hours beach", "house bloom" ]));
 * console.log(halveStrArr([ "The hours", "beach", "house", "bloom" ]));
 * console.log(halveStrArr([ "The", "hours", "beach", "house", "bloom" ]));
 * ```
 */
const halveStrArr = strArr => {
	// CMT note to self, i think i could make a recursion out of this
	const halvedArr = strArr.flatMap(str => halveStr(str));

	return halvedArr.every((str, i) => str === strArr[i]) ? false : halvedArr;
};

// eslint-disable-next-line
const escapeRegex = str => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

/**
 *
 */
class SongSchemaMethods {

	/**
	 * Returns the description of this {@link SongDocument}.
	 *
	 * @this {SongDocument}
	 *
	 * @returns {string}
	 */
	get desc() {
		return `${this.title} ${this.album} ${this.artist} ${this.release} ${this.price}`;
	}

	/**
	 * Searches {@link SongDocument}s by its `album` field.
	 *
	 * @param {string} album
	 *
	 * @param {boolean} caseSensitive
	 *
	 * @this {Song}
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findByAlbum("bloom", false);
	 * ```
	 */
	static async findByAlbum(album, caseSensitive = true) {
		const res = await this.find({
			album : {
				$options : `${caseSensitive ? "" : "i"}`,
				$regex   : album,
			}
		});

		return res.length ? res : nothingFound("album", album, caseSensitive);
	}

	/**
	 * Searches {@link SongDocument}s by its `artist` field.
	 *
	 * @param {string} artist
	 *
	 * @param {boolean} caseSensitive
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findByArtist("BEACH housE", false);
	 * ```
	 */
	static async findByArtist(artist, caseSensitive = true) {
		const res = await this.find({
			artist : {
				$options : `${caseSensitive ? "" : "i"}`,
				$regex   : artist,
			}
		});

		return res.length ? res : nothingFound("artist", artist, caseSensitive);
	}

	/**
	 * Searches {@link SongDocument}s by its `isOnSale` field.
	 *
	 * @param {boolean} isOnSale
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findBySaleStatus(false);
	 * ```
	 */
	static async findBySaleStatus(isOnSale) {
		const res = await this.find({ isOnSale });

		return res.length ? res : nothingFound("sale", isOnSale);
	}

	/**
	 * Searches {@link SongDocument}s by its `title` field.
	 *
	 * @param {string} title
	 *
	 * @param {boolean} caseSensitive
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * await Song.findByTitle("The Hours", true);
	 * ```
	 */
	static async findByTitle(title, caseSensitive = true) {
		const res = await this.find({
			title : {
				$options : `${caseSensitive ? "" : "i"}`,
				$regex   : title,
			}
		});

		return res.length ? res : nothingFound("title", title, caseSensitive);
	}

	/**
	 * Searches {@link SongDocument}s by its `links` field.
	 *
	 * @param {boolean | {
	 * spotify: boolean,
	 * deezer: boolean}} option
	 *
	 * @returns {Promise<SongDocument>}
	 *
	 * @example
	 * ```
	 * // Find songs where every link is not "not available"
	 * await Song.findByAlbum(true);
	 *
	 * // Find songs where every link is "not available"
	 * await Song.findByAlbum(false);
	 *
	 * // Find songs where deezer link is "not available" and spotify is
	 * // available.
	 * await Song.findByAlbum({
	 * 	spotify    : true
	 * });
	 * ```
	 */
	static async findByLinksAvailability(option) {
		// eslint-disable-next-line
		option.toString = function() {
		   return `{deezer : ${this.deezer}, spotify : ${this.spotify}`;
		};
		let res;

		if (typeof option === "object") {
			const { deezer, spotify } = option;
			res = await this.find({
				"links.deezer"  : { $regex : deezer ? /^(?!not available$).*$/ : /^not available$/ },
				"links.spotify" : { $regex : spotify ? /^(?!not available$).*$/ : /^not available$/ }
			});
		} else {
			res = await this.find({
				"links.deezer"  : { $regex : option ? /^(?!not available$).*$/ : /^not available$/ },
				"links.spotify" : { $regex : option ? /^(?!not available$).*$/ : /^not available$/ }
			});
		}

		return res.length ? res : nothingFound("option", option);
	}

	/**
	 * Queries the {@link Song} model and returns an array of `SongDocument` that
	 * closely matches `q` and is sorted from the most relevant to the least based on
	 * its `matchCount` property.
	 *
	 * @param {string} q
	 * A flexible case insensitive string to query {@link Song} model. The more
	 * words there are in `q`, the more songs it will include. Examples:
	 * 1. "The hours beach house bloom"
	 * 2. "song depression space beach cherry house"
	 * 3. "CHROM gAgA lAd 11 bOy suMMer"
	 * 4. "Ad ad eOm ndY ica Ou aNd", interestingly this one could include sour
	 * candy by lady gaga if present in database.
	 * 5. "Rt op tp ar u y gu uy aga g" this one could include G.U.Y by lady
	 * gaga if present.
	 * 6. "He ek iw no ll He cH mO th" this one could include all we know by
	 * the chainsmokers if present.
	 *
	 * @param {number} qThreshold
	 * An optional integer or decimal from `0` to `100` to configure the threshold
	 * for when a `SongDocument` should be included after matching it with `q`.
	 * Defaults to `50`.
	 *
	 * @param {number} qMatchCountInc
	 * An optional integer or decimal to configure how much to increment the match
	 * count when a part of `SongDocument` matches a part of `q`. Defaults to `1`
	 *
	 * @returns {Promise<import("../../models/song.js").SongDocument[]>}
	 * A promise that resolves into the results.
	 *
	 * @example
	 * Using the default values for `qThreshold` and `qMatchCountInc`:
	 * ```js
	 * console.log(await querySongs("The Hours bloom beach house"));
	 * ```
	 *
	 * Using the custom values for `qThreshold` and `qMatchCountInc`:
	 * ```js
	 * console.log(await querySongs("The Hours bloom beach house", 60.32, 0.8));
	 * ```
	 */
	static async querySongs(q, qThreshold = 50, qMatchCountInc = 1) {
		const allSongs = await this.find();
		const threshold = q.split(" ").length * (qThreshold / 100);
		const filtered = allSongs.filter(song => {
			let matchCount = 0;

			let halvedQ = [ q ];
			while (halvedQ) {
				for (const query of halvedQ) {
					if (new RegExp(escapeRegex(query), "i").test(song.desc)) {
						matchCount += qMatchCountInc;
					}
				}
				halvedQ = halveStrArr(halvedQ);
			}
			if (matchCount >= threshold) {
				song.matchCount = matchCount;

				return true;
			}
		});

		return filtered.sort(
			(song1, song2) => song2.matchCount - song1.matchCount
		);
	}
}

SongSchema.loadClass(SongSchemaMethods);
export const Song = mongoose.model("Song", SongSchema);

export default Song;

// DBG test Song.querySongs()
// import { config } from "dotenv";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// config({ path : join(__dirname, "..", "..", "process.env") });

// const mongoDatabase = process.env.MONGODB;
// try {
// 	await mongoose.connect(`mongodb://localhost:27017/${mongoDatabase}`);
// 	console.log(`Connected to ${mongoDatabase}!🍃`);
// } catch (err) {
// 	console.log(`Error! Can't connect to ${mongoDatabase}!🍂`, err);
// }

// const q1 = "The hours beach house bloom";
// const q2 = "boy summer";
// const q3 = "song depression space beach cherry house";
// const q4 = "beach dreams house teen be to used";
// const q5 = "chrom gaga lad 11";
// console.log(await Song.querySongs(q1));
// console.log(await Song.querySongs(q2));
// console.log(await Song.querySongs(q3));
// console.log(await Song.querySongs(q4));
// console.log(await Song.querySongs(q5));
// mongoose.connection.close();
