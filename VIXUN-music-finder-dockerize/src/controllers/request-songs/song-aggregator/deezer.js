import axios from "axios";

/**
 * Search using Deezer's [`/search` endpoint](https://developers.deezer.com/api/search).
 *
 * @param {string} q
 * A general query string that can aslo accept a combination of tracks,
 * artists and albums or based on only one of those types controlled by the
 * `type` parameter.
 *
 * @param {"/" | "/album" | "/artist" | "/track"} endpoint
 * A string that can either be `"/" | "/album" | "/artist" | "/track"` which
 * will control what search [endpoint to use from Deezer](https://developers.deezer.com/api/search#connections).
 * Defaults to `"/"` which will use the general `/search` endpoint.
 *
 *
 * @param {number} limit
 * The number of items to return. Defaults to `1`.
 *
 * @returns {Promise<object[]>}
 * A promise that resolves to an array containing results object.
 *
 * @example
 * ```
 * const res = (await searchDeezer("The hours beach house"))[0];
 * console.log(res);
 * ```
 */
const searchDeezer = async (q, endpoint = "/", limit = 1) => {
	const res = await axios.get(`http://api.deezer.com/search${endpoint}`, { params : { q } });

	return res.data.data.slice(0, limit);
};

/**
 * GET Deezer's [chart](https://developers.deezer.com/api/chart#infos) data.
 *
 * @param {"/" | "/albums" | "/artists" | "/tracks"} endpoint
 * Which chart endpoint to use. Defaults to `"/tracks"`.
 *
 * @returns {Promise<>}
 * A promise that resolves into the found data.
 *
 * @example
 * ```
 * console.log((await searchDeezerChart("/tracks")).data);
 * ```
 */
const searchDeezerChart = async (endpoint = "/tracks") => {
	endpoint = endpoint !== "/" ? `/0${endpoint}` : "";
	const res = await axios.get(`https://api.deezer.com/chart${endpoint}`);

	return res.data;
};

/**
 * Extracts `data` from Deezer's search endpoint results.
 *
 * @param {object} data
 * One of these objects acquired from Deezer API's search endpoint or
 * {@link searchDeezer}:
 * 1. An `album` object.
 * 2. An `artist` object.
 * 3. A `track` object.
 *
 * This functions checks the `data.type` property for what kind of object to
 * extract (`"album" | "artist" | "track"`).
 *
 * @returns {object} An object containing extracted data from `data`.
 *
 * @example
 * ```
 * const result = await searchDeezer(
 * "The Hours beach house",
 * "/track"
 * );
 * console.log(extractDeezer(res[0]));
 * ```
 */
const extractDeezer = data => {
	/* eslint-disable jsdoc/require-jsdoc */
	const extractAlbum = album => {
		const {
			id,
			title,
			type,
			link,
			cover_big : image,
		} = album;

		return {
			id,
			image,
			link,
			title,
			type
		};
	};

	const extractArtist = artist => {
		const {
			id,
			name,
			type,
			link,
			picture_medium : image
		} = artist;

		return {
			id,
			image,
			link,
			name,
			type,
		};
	};

	const extractTrack = track => {
		const {
			id,
			preview,
			rank,
			title,
			type,
			link,
			album  : { title : album },
			artist : { name  : artist },
		} = track;

		return {
			album,
			artist,
			id,
			link,
			preview,
			rank,
			title,
			type
		};
	};

	switch (data.type) {
		case "album" :
			return extractAlbum(data);

		case "artist" :
			return extractArtist(data);

		case "track" :
			return extractTrack(data);

		default :
			return {};
	}
};

const deezer = {
	extractDeezer,
	searchDeezer,
	searchDeezerChart
};

export default deezer;