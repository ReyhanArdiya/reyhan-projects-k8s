/**
 * Creates a new Song object that contains information about a song.
 */
export class Song {

	/**
	 * Constructs the {@link Song} object.
	 *
	 * @param {string} title The song's title.
	 *
	 * @param {string} artist The song's artist.
	 *
	 * @param {string} album The song's album.
	 *
	 * @param {string} genre The song's genre.
	 *
	 * @param {number} year The song's or album's release year.
	 *
	 * @param {number} priceUSD The song's price.
	 *
	 * @param {string} coverURL The song's cover URL.
	 *
	 * @param {string} fileURL The song's file URL.
	 *
	 * @param {boolean} isOnSale The song's on sale status.
	 *
	 * @example
	 * ```
	 *  new Song(
	 *		"The Hours",
	 *		"Beach House",
	 *		"Bloom",
	 *		"Shoegaze",
	 *		2012,
	 *		4.99,
	 *		"path/to/cover",
	 *		"path/to/song/file",
	 *		false
	 *	);
	 * ```
	 */
	constructor(
		title,
		artist,
		album,
		genre,
		year,
		priceUSD,
		coverURL,
		fileURL,
		isOnSale = false
	) {
		this._title = title;
		this._artist = artist;
		this._album = album;
		this._genre = genre;
		this._year = year;
		this._priceUSD = priceUSD;
		this._coverURL = coverURL;
		this._fileURL = fileURL;
		this._downloads = 0;
		this._isOnSale = isOnSale;
	}

	get title() {
		return this._title;
	}
	set title(val) {
		if (typeof val === "string") {
			this._title = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}

	get artist() {
		return this._artist;
	}
	set artist(val) {
		if (typeof val === "string") {
			this._artist = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}

	get album() {
		return this._album;
	}
	set album(val) {
		if (typeof val === "string") {
			this._album = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}

	get genre() {
		return this._genre;
	}
	set genre(val) {
		if (typeof val === "string") {
			this._genre = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}

	get year() {
		return this._year;
	}
	set year(val) {
		if (typeof val === "number") {
			this._year = val;
		} else {
			console.error("Wrong type! It should be number!");
		}
	}

	get priceUSD() {
		return this._priceUSD;
	}
	set priceUSD(val) {
		if (typeof val === "number") {
			this._priceUSD = val;
		} else {
			console.error("Wrong type! It should be number!");
		}
	}

	get coverURL() {
		return this._coverURL;
	}
	set coverURL(val) {
		if (typeof val === "string") {
			this._coverURL = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}

	get fileURL() {
		return this._fileURL;
	}
	set fileURL(val) {
		if (typeof val === "string") {
			this._fileURL = val;
		} else {
			console.error("Wrong type! It should be string!");
		}
	}

	get isOnSale() {
		return this._isOnSale;
	}
	set isOnSale(val) {
		if (typeof val === "boolean") {
			this._isOnSale = val;
		} else {
			console.error("Wrong type! It should be boolean!");
		}
	}

	get downloads() {
		return this._downloads;
	}

	/**
	 * Increments a `Song` `downloads` property by one and returns the
	 * current `downloads` value.
	 *
	 * @returns {number} The current `downloads` value.
	 *
	 * @example
	 * ```
	 * songDatabase1.songs[0].addDownloads()
	 * ```
	 */
	addDownloads() {
		this._downloads++;

		return this._downloads;
	}

	/**
	 * Use this property to check the validity of the song,
	 * e.g. Properties with wrong value types, incomplete data, etc.
	 *
	 * @returns An object containing properties about a {@link Song}'s validity.
	 */
	get validity() {
		const errorObj = {
			missingProps : [],
			wrongTypes   : {
				simple  : [],
				verbose : []
			},
			isPriceRight : false,
			isValid      : false
		};

		const dummySong = new Song(
			"this",
			"is",
			"a",
			"dummy",
			1,
			1,
			"object",
			"meow",
			false
		);
		const songKeys = Object.keys(dummySong);
		const thisValidKeys = Object.entries(this)
			.filter(prop => prop[1] !== undefined)
			.map(prop => prop[0]);

		// Checks for missing properties
		songKeys.forEach(key => {
			if (!thisValidKeys.includes(key)) {
				errorObj.missingProps.push(key);
			}
		});

		// Checks for wrong value types
		songKeys.forEach(key => {
			if (typeof this[key] !== typeof dummySong[key]) {
				errorObj.wrongTypes.simple.push(key);
			}

			// Adds error message for incorrect value types
			const keyErr = `this.${key} is ${typeof this[key]}, it should be`;
			switch (key) {
				case "_title" :

				case "_artist" :

				case "_album" :

				case "_genre" :

				case "_coverURL" :

				case "_fileURL" :
					if (typeof this[key] !== "string") {
						errorObj.wrongTypes.verbose.push(`${keyErr} string!`);
					}
					break;

				case "_year" :

				case "_priceUSD" :
					if (typeof this[key] !== "number") {
						errorObj.wrongTypes.verbose.push(`${keyErr} number!`);
					}
					break;

				case "_isOnSale" :
					if (typeof this[key] !== "boolean") {
						errorObj.wrongTypes.verbose.push(`${keyErr}boolean!`);
					}
					break;
			}
		});

		// Checks if price format is correct
		errorObj.isPriceRight = new RegExp(/^\d+(?:.\d{2})?$/i)
			.test(`${this.priceUSD}`);

		if (!errorObj.missingProps.length &&
			!errorObj.wrongTypes.simple.length &&
			!errorObj.wrongTypes.verbose.length &&
			errorObj.isPriceRight) {
			errorObj.isValid = true;
		}

		return errorObj;
	}

	/**
	 * Used to overwrite `Object.toString()` when this `Song` is used in a
	 * string expression.
	 *
	 * @returns {string} The string description of this `Song`.
	 *
	 * @example
	 * ```
	 * // This is called after addDownloads() is called
	 *console.log(
	 * `This Song's ${String(prop)} has been changed` +
	 * ` from ${previousTarPropVal} to ${val}`
	 * );
	 * // Prints out "This Song's _downloads has been changed from X to Y"
	 * ```
	 */
	toString() {
		return `Song with a title of ${this.title} by ${this.artist}`;
	}
}

/**
 * Creates a new {@link SongDatabase},
 * associate it with a certain localStorage songs database based
 * on the `keyNumber` argument and return it.
 *
 * @param {number} keyNumber
 * Use this number to associate a certain localStorage songs database to the
 * returned {@link SongDatabase}.Important to specify since there could be
 * multiple {@link SongDatabase} in the project. The basic syntax of the
 * localStorage songs database key is `songs${keyNumber}`.
 *
 * @param {boolean} autoUploadChanges
 * Boolean to control automatic uploads whenever this {@link SongDatabase} is
 * changed through any appropiate means; defaults to true and can be read/write
 * through `SongDatabase.autoUploadChanges` getter/setter.
 *
 * @returns {SongDatabase} Returns the song database object.
 *
 * @example
 * ```
 *  newSongDatabase(1)
 * ```
 */
export function newSongDatabase(keyNumber, autoUploadChanges = true) {

	/**
	 * Object that matches {@link Song} properties
	 * to be used for configuration during processes on {@link songs}.
	 *
	 * @typedef {{ title?: string,
	 * artist?: string,
	 * album?: string,
	 * genre?: string,
	 * year?: number,
	 * priceUSD?: number,
	 * coverURL?: string,
	 * fileURL?: string,
	 * downloads?: number,
	 * isOnSale?: boolean }} options
	 */

	/**
	 * Variable to store the song database which will be set later
	 * using {@link SongDatabase.getSongs} when a new {@link SongDatabase} is
	 * constructed. This variable will be stored in a closure enviroment for
	 * increased privacy.
	 *
	 * @type { Song[] | any[] }
	 */
	let songs;

	/**
	 * Sets {@link songs} to localStorage.
	 *
	 * @example
	 * ```
	 * setSongs
	 * ```
	 */
	const setSongs = () => {
		if (songs.every(Song => Song.validity.isValid)) {
			localStorage.setItem(`songs${keyNumber}`, JSON.stringify(songs));
		} else {
			console.error(
				"This database's songs has an invalid song!\
			 	It won't be uploaded."
			);
		}
	};

	/**
	 * This is the alternative to {@link setSongs} where if
	 * {@link autoUploadChanges} is false, it confirms whether you want to
	 * upload the changes before calling {@link setSongs}; else it just calls
	 * {@link setSongs}.
	 *
	 * @example
	 * ```
	 * if (prevSongVal !== newSongVal) {
	 * 	uploadDatabase()
	 * }
	 * ```
	 */
	const uploadDatabase = () => {
		 autoUploadChanges ?
			setSongs() :
			confirm("Want to upload current database?") && setSongs();
	};

	class SongDatabase {

		constructor() {
			this.getSongs();

			Object.defineProperty(this, "songs", {
				// eslint-disable-next-line
				get() {
					return songs;
				}
			});
			Object.defineProperty(this, "autoUploadChanges", {
				// eslint-disable-next-line
				get() {
					return autoUploadChanges;
				},

				// eslint-disable-next-line
				set(val) {
					if (typeof val === "boolean") {
						autoUploadChanges = val;
					} else {
						console.error("Wrong type! It should be boolean!");
					}
				}
			});
		}

		/**
		 * Processes {@link songs} from localStorage and wrap the resulting
		 * array in a proxy.
		 *
		 * @param {boolean} wrapInProxy
		 * True to wrap each Song in {@link parsedSongsDatabase} in a proxy
		 * through {@link wrapSongProxy}, false to not wrap; defaults to true.
		 *
		 * @param {boolean} setToSongs
		 * True to set the {@link proxiedSongsDatabase} to {@link songs},
		 * false to return it instead; defaults to true.
		 *
		 * @returns {any[] | Song[]} An empty array if not found in localStorage
		 * or a {@link Song} array.
		 *
		 * @example
		 * ```
		 * // Wrap the parsed array in a proxy and set it to songs.
		 * getSongs()
		 *
		 * // Wrap the parsed array in a proxy and return it.
		 * getSongs(true, false)
		 *
		 * // Don't wrap the parsed array in a proxy and set it to songs.
		 * getSongs(false, true)
		 *
		 * // Don't wrap the parsed array in a proxy and return it.
		 * getSongs(false, false)
		 * ```
		 */
		getSongs(wrapInProxy = true, setToSongs = true) {

			/**
			 * If the corresponding database exist in localStorage,
			 * parse it to an array and set each {@link Song} object inside
			 * prototype to {@link Song} class.
			 * If not set it to an empty array instead. Both of these arrays
			 * will be wrapped in a proxy through {@link proxiedSongsDatabase}.
			 *
			 * @type {Song[] | any[]}
			 */
			const parsedSongsDatabase =
				localStorage.getItem(`songs${keyNumber}`) ?
					JSON.parse(localStorage.getItem(`songs${keyNumber}`))
						.map(song => {

							// Set each parsed JSON object proto to Song
							return Object.setPrototypeOf(song, Song.prototype);
						}) :
					[];

			if (wrapInProxy) {
				parsedSongsDatabase.forEach((Song, i, arr) => {
					return arr.splice(i, 1, this.wrapSongProxy(Song));
				});
			}

			/**
			 * The proxy traps still do the same thing as their original
			 * methods but it's going to also print out what happened in
			 * the console when a {@link Song} is changed or deleted from
			 * the database.
			 */
			const proxiedSongsDatabase = new Proxy(parsedSongsDatabase, {
				// eslint-disable-next-line
				set(tar, prop, val) {
					Reflect.set(tar, prop, val);
					console.info(`${tar[prop]} has been changed to ${val}`);
					uploadDatabase();

					return true;
				},
				// eslint-disable-next-line
				deleteProperty(tar, prop) {
					console.info(`${tar[prop]} has been deleted!`);
					uploadDatabase();

					return true;
				}
			});

			if (setToSongs) {
				songs = proxiedSongsDatabase;
			} else {
				return proxiedSongsDatabase;
			}
		}

		/**
		 * Adds a new {@link Song} object to {@link songs}.
		 *
		 * Arguments must be valid, if not it will console.error the new song's
		 * {@link Song.validity}; else it will
		 * console.log the new {@link songs}.length.
		 *
		 * @param {string} title The song's title.
		 *
		 * @param {string} artist The song's artist.
		 *
		 * @param {string} album The song's album.
		 *
		 * @param {string} genre The song's genre.
		 *
		 * @param {number} year The song's or album's release year.
		 *
		 * @param {number} priceUSD The song's price.
		 *
		 * @param {string} coverURL The song's cover URL.
		 *
		 * @param {string} fileURL The song's file URL.
		 *
		 * @param {boolean} isOnSale The song's on sale status.
		 *
		 * @returns {void}
		 *
		 * @example
		 * ```
		 * SongDatabase.addSong(
		 *   "The Hours",
		 *   "Beach House",
		 *   "Bloom",
		 *   "Shoegaze",
		 *   2012,
		 *   4.99,
		 *   "url",
		 *   "url"
		 * );
		 * ```
		 */
		addSong(
			title,
			artist,
			album,
			genre,
			year,
			priceUSD,
			coverURL,
			fileURL,
			isOnSale = false
		) {
			const newSong = new Song(
				title,
				artist,
				album,
				genre,
				year,
				priceUSD,
				coverURL,
				fileURL,
				isOnSale
			);

			return newSong.validity.isValid ?
				console.log(songs.push(this.wrapSongProxy(newSong))) :
				console.error(newSong.validity);
		}

		/**
		 * Removes ONE {@link Song} object from {@link songs} based on
		 * properties passed to {@link options} object and returns it.
		 *
		 * @param {options} options Object that matches {@link Song} properties
		 * that will be deleted.
		 *
		 * @param {boolean} isCaseSensitive Boolean to control the
		 * case sensitive matching.
		 *
		 * @returns The deleted song or error message.
		 *
		 * @example
		 * ```
		 * // Deletes a song with the title of "911" by artist "Lady Gaga" in
		 * // album "Chromatica" with the exact casing of each of those strings.
		 * songDatabase1.delSong({
		 * 	title : "911",
		 * 	artist : "Lady Gaga",
		 * 	album : "Chromatica"
		 * })
		 * ```
		 */
		delSong(options, isCaseSensitive = true) {
			const [ searchedSong ] = this.searchSongs(options, isCaseSensitive);

			return songs.includes(searchedSong) ?
				songs.splice(
					songs.findIndex(song => song === searchedSong),
					1
				)[0] :
				"Song Not Found :(";
		}

		/**
		 * Returns a {@link Song} array filtered from {@link songs} based on
		 * ATLEAST one or more key-value pairs of each {@link Song} that is
		 * sent in the `options` parameter.
		 *
		 * @param {options} options
		 * Object that contains key-value pairs like {@link Song} that is used
		 * during the filtering process.
		 *
		 * @param {boolean} isCaseSensitive
		 * If it is true, the values on each {@link options} properties is
		 * case sensitive when checked againts the same properties in a
		 * {@link Song}; defaults to true.
		 *
		 * @returns {Song[] | any[]}
		 * The filtered {@link Song} array or empty array if no song is found.
		 *
		 * @example
		 * ```
		 * // Search for songs by artist "lady Gaga" in album "Chromatica"
		 * // but casing doesn't matter
		 * SongDatabase.searchSongs({
		 * 	artist : "lAdY gaga",
		 * 	album : "ChromaTICa"
		 * },
		 * false)
		 * ```
		 */
		searchSongs(options, isCaseSensitive = true) {
			const optionsEntries = Object.entries(options);
			if (isCaseSensitive) {
				return songs.filter(song => {
					return optionsEntries.every(option => {
						return song[option[0]] === option[1];
					});
				});
			} else {
				return songs.filter(song => {
					return optionsEntries.every(option => {
						const [ key, val ] = option;

						return typeof song[key] === "string" ?
							song[key].toLowerCase() === val.toLowerCase() :
							song[key] === option[1];
					});
				});
			}
		}

		/**
		 * Returns a new sorted array of {@link songs}.
		 *
		 * @param {"title" | "artist" | "album" | "genre" | "year" |
		 * "priceUSD" | "coverURL" | "fileURL" | "downloads" |
		 * "isOnSale" } whichProp
		 * A string that matches a key of {@link Song}.
		 *
		 * @param {"asc" | "desc"} ascOrDesc
		 * "asc" to sort ascending and vice-versa; defaults to "desc".
		 *
		 * @returns {Song[]} Returns the sorted {@link songs} array.
		 *
		 * @example
		 * ```
		 * // Returns a sorted songs array with the highest price to the lowest.
		 * SongDatabase.sortSongs("priceUSD", "desc");
		 * ```
		 */
		sortSongs(whichProp, ascOrDesc = "asc") {
			return [ ...songs ].sort((song1, song2) => {
				if (typeof song1[whichProp] === "string") {
					if (ascOrDesc === "asc") {
						return song1[whichProp] > song2[whichProp] ? 1 : -1;
					} else {
						return song1[whichProp] < song2[whichProp] ? 1 : -1;
					}
				} else {
					return ascOrDesc === "asc" ?
						song1[whichProp] - song2[whichProp] :
						song2[whichProp] - song1[whichProp];
				}
			});
		}

		/**
		 * Wraps a {@link Song} object in a proxy and returns the Proxy. This
		 * whill proxy the original object.
		 *
		 * @param {Song} Song The {@link Song} object to be proxied.
		 *
		 * @returns {Song} Returns the wrapped {@link Song}.
		 *
		 * @example
		 * ```
		 * // Wraps a song acquired from SongDatabase.searchSongs method.
		 * const song = SongDatabase.searchSongs({
		 * 	title : "Elegy to the Void"
		 * })[0];
		 *
		 * SongDatabase.wrapSongProxy(song);
		 * ```
		 */
		wrapSongProxy(Song) {
			return new Proxy(Song, {

				// eslint-disable-next-line
				set(tar, prop, val) {
					const previousTarPropVal = Reflect.get(tar, prop);

					Reflect.set(tar, prop, val);

					/*  If the change is different from localStorage
					automatically upload it */
					if (previousTarPropVal !== Reflect.get(tar, prop)) {
						console.log(
							`This Song's ${String(prop)} has been changed` +
							` from ${previousTarPropVal} to ${val}`
						);

						uploadDatabase();
					}

					return true;
				}
			});
		}
	}

	return new SongDatabase();
}

export const songDatabase1 = newSongDatabase(1);

// DBG
// SongDatabase1.addSong(
// 	"The Hours",
// 	"Beach House",
// 	"Bloom",
// 	"Shoegaze",
// 	2011,
// 	4.99,
// 	"url",
// 	"url"
// );
// SongDatabase1.addSong(
// 	"On the Sea",
// 	"Beach House",
// 	"Bloom",
// 	"Shoegaze",
// 	2011,
// 	4.99,
// 	"url"
// 	, "url"
// );
// SongDatabase1.addSong(
// 	"Peoples",
// 	"Beach House",
// 	"Bloom",
// 	"Shoegaze",
// 	2011,
// 	4.99,
// 	"url",
// 	"url"
// );
// SongDatabase1.addSong(
// 	"Myth",
// 	"Beach House",
// 	"Bloom",
// 	"Shoegaze",
// 	2011,
// 	4.99,
// 	"url",
// 	"url"
// );
// SongDatabase1.addSong(
// 	"Lazuli",
// 	"Beach House",
// 	"Bloom",
// 	"Shoegaze",
// 	2011,
// 	4.99,
// 	"url",
// 	"url"
// );
// SongDatabase1.addSong(
// 	"911",
// 	"Lady Gaga",
// 	"Chromatice",
// 	"Pop",
// 	2020,
// 	4.99,
// 	"url",
// 	"url"
// );
// SongDatabase1.addSong(
// 	"Alice",
// 	"Lady Gaga",
// 	"Chromatice",
// 	"Pop",
// 	2020,
// 	4.99,
// 	"url",
// 	"url"
// );
// SongDatabase1.addSong(
// 	"Babylon",
// 	"Lady Gaga",
// 	"Chromatice",
// 	"Pop",
// 	2020,
// 	4.99,
// 	"url",
// 	"url"
// );

export default songDatabase1;

