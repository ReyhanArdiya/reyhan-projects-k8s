import amazonMusic from "./amazon-music.js";
import deezer from "./deezer.js";
import spotify from "./spotify.js";

let spotifyToken;
try {
	spotifyToken = await spotify.getSpotifyToken();
	// eslint-disable-next-line no-unused-vars
	const refreshSpotifyToken = setInterval(async () => {
		spotifyToken = await spotify.getSpotifyToken();
	}, 3_540_000);
} catch (err) {
	console.error("Cannot get spotify token!");
}

/**
 * An aggregator that will search using {@link deezer.searchDeezer} and
 * {@link spotify.searchSpotify} then aggregates their data into one
 * mainly following `SongSchema` except for `price` property and returns it.
 *
 * @param {string} q
 * A query string to search for in deezer API and spotify API. It is recommended
 * that the format is `"${trackTitle} ${artist}" for a more specific search result.
 *
 * @returns A promise that resolves into {@link aggregatedData}.
 *
 * @example
 * ```js
 * const browser = await puppeteer.launch({ headless : false });
 * const page = await browser.newPage();
 * console.log(await aggregator("the hours beach house", page, "priceCardsContainer"));
 * console.log(await aggregator("oh no oh yes akina nakamori", page, "priceCardsContainer"));
 * ```
 */
const songAggregator = async q => {
	/*  eslint-disable jsdoc/require-jsdoc */
	const aggregatedData = {
		album       : null,
		artist      : null,
		artistImage : null,
		externals   : {},
		image       : null,
		release     : null,
		title       : null
	};

	try {
		const spotifyTrackRes = await spotify.searchSpotify(
			spotifyToken,
			q,
			[ "track" ]
		);
		const spotifyTrackExt = spotify.extractSpotify(
			spotifyTrackRes.tracks?.items[0]
		);
		const spotifyAlbumExt = spotify.extractSpotify(
			spotifyTrackRes.tracks?.items[0].album
		);
		aggregatedData.album = spotifyTrackExt.album;
		aggregatedData.artist = spotifyTrackExt.artist;

		const spotifyArtistRes = await spotify.searchSpotify(
			spotifyToken,
			aggregatedData.artist,
			[ "artist" ]
		);
		const spotifyArtistExt = spotify.extractSpotify(
			spotifyArtistRes.artists.items[0]
		);
		aggregatedData.artistImage = spotifyArtistExt.image;
		aggregatedData.image = spotifyAlbumExt.image;
		aggregatedData.release = spotifyAlbumExt.release;
		aggregatedData.title = spotifyTrackExt.name;
		aggregatedData.externals.spotify = {
			id      : spotifyTrackExt.id,
			link    : spotifyTrackExt.link,
			preview : spotifyTrackExt.preview
		};
	} catch (err) { /* nothing */ }

	try {
		const deezerTrackRes = await deezer.searchDeezer(q);
		const deezerTrackExt = deezer.extractDeezer(deezerTrackRes[0]);
		const deezerAlbumExt = deezer.extractDeezer(deezerTrackRes[0].album);
		const deezerArtistExt = deezer.extractDeezer(deezerTrackRes[0].artist);
		aggregatedData.album ??= deezerTrackExt.album;
		aggregatedData.artist ??= deezerTrackExt.artist;
		aggregatedData.artistImage ??= deezerArtistExt.image;
		aggregatedData.image ??= deezerAlbumExt.image;
		aggregatedData.title ??= deezerTrackExt.title;
		aggregatedData.externals.deezer = {
			id      : deezerTrackExt.id,
			link    : deezerTrackExt.link,
			preview : deezerTrackExt.preview
		};
	} catch (err) { /* nothing */ }

	return aggregatedData;
};

export const aggregatorAPIs = {
	amazonMusic,
	deezer,
	spotify
};

export default songAggregator;

// DBG some aggregator tests
// import puppeteer from "puppeteer";
// const browser = await puppeteer.launch({ headless : true });
// const page = await browser.newPage();
// console.log(await songAggregator("Tell Me You Love Me bolbbalgan4", page));
// console.log(await songAggregator("Catallena orange CARAMEL", page));
// console.log(await songAggregator("레옹 IU GOD G", page));
// console.log(await songAggregator("abyss of decadence", page));
// console.log(await songAggregator("zavodila mike geno", page));
// console.log(await songAggregator("theme from schindler's list", page));
// console.log(await songAggregator("stay o WHEN", page));
// console.log(await songAggregator("time deyaz", page));
// console.log(await songAggregator("song from a secret garden", page));
// console.log(await songAggregator("sacrifice weekend", page));
// console.log(await songAggregator("release + fading orenji music", page));
// console.log(await songAggregator("Oh No, Oh Yes! Akina Nakamori", page));
// console.log(await songAggregator("the STEP BELOW hell", page));
// console.log(await songAggregator("911 lady gaga", page));
// console.log(await songAggregator("baka mitai", page));
// console.log(await songAggregator("the hours beach house"));
// console.log(await songAggregator("sour candy lady gaga", page));
// console.log(await songAggregator("summerboy lady gaga", page));
// console.log(await songAggregator("used to be beach house", page));
// console.log(await songAggregator("bloody marry lady gaga", page));
