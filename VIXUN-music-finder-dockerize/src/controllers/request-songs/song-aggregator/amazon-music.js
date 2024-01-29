/**
 * Options for {@link scrapeAmazonMusic}.
 *
 * @typedef {object} ScrapeAmazonMusicOptions
 *
 * @property {RegExp} pricePattern
 * A regular expression to search for the prices inside of the found container's
 * `innerText`. Defaults to `/\$\d+.?\d{0,2}/g`.
 *
 * @property {string} priceContainerSelector
 * A selector to search for an item's price container element using
 * `page.waitForSelector`. If omitted it will use some predefined selectors:
 * 1. `"priceCardsContainer"` should be used when the amazon page list the
 * item's prices using price cards. As of now, this will select the
 * `"#tmmSwatches"` element in the amazon page which contains price cards for
 * the item.
 * 2. `"singleSongContainer"` should be used when the amazon page is a page for
 * a single song where there is only one price for the song.
 *
 * @property {number} timeout
 * Number for how long to wait for each `page.waitForSelector`. Default is 5000.
 */

/**
 * **HEADS UP! This scrapper was made based on what amazon look liked in 19/01/2022**
 *
 * This function will either scrape an album's price or possibly a single
 * song's price based on what was found in [Amazon Music, CDs & Vinyl category](https://www.amazon.com/s?i=music-intl-ship).
 *
 * **Some tips to not get block while scrapping:**
 * 1. Do not make many request frequently or in a fixed interval, do some randomizations!.
 * 2. Do not make multiple requests at once.
 * 3. Do some IP rotation.
 * 4. Change the page's user agent frequently.
 * 5. Limit how many calls to do per minute/hour/day.
 *
 * @param {import("puppeteer").Page} page
 * A `puppeteer.Page`.
 *
 * @param {string} albumOrSong
 * An album or song title case insensitive. It is recommended for the string to
 * match as closely as possible the inteded album or song.
 *
 * @param {string} artist
 * An artist case insensitive. It is recommended for the string to
 * match as closely as possible the inteded artist.
 *
 * @param {ScrapeAmazonMusicOptions} options
 *
 * @returns {Promise<AmazonMusicData>}
 * A promise that resolves to {@link AmazonMusicData}.
 *
 * @example
 * An album with price cards:
 * ```js
 * const browser = await puppeteer.launch();
 * const page = await browser.newPage();
 * const res = await scrapeAmazonMusic(page, "depression cherry", "beach house", "priceCardsContainer");
 * console.log(res);
 * await browser.close();
 * ```
 *
 * @example
 * A song with one price:
 * ```js
 * const browser = await puppeteer.launch();
 * const page = await browser.newPage();
 * const res = await scrapeAmazonMusic(page, "time", "deyaz", "singleSongContainer");
 * console.log(res);
 * await browser.close();
 * ```
 */
const scrapeAmazonMusic = async (
	page,
	albumOrSong,
	artist,
	options = {}
) => {
	const {
		pricePattern = /\$\d+.?\d{0,2}/g,
		priceContainerSelector = {
			priceCardsContainer : "#tmmSwatches",
			singleSongContainer : "a[href*='handle-buy-box']"
		},
		timeout = 5000
	} = options;
	const q = `${albumOrSong} ${artist}`.toLowerCase()
		.split(" ")
		.join("+");
	await page.goto(`https://www.amazon.com/s?k=${q}&i=music-intl-ship`);

	let selectedItem;
	const selectedItemRegex = new RegExp(
		`(?<=/)${`${albumOrSong} ${artist}`.toLowerCase()
			.split(" ")
			.join("-")}(?=/)|(?<=/)${`${artist} ${albumOrSong}`.toLowerCase()
			.split(" ")
			.join("-")}(?=/)`,
		"i"
	);

	selectedItem = await page.evaluateHandle(
		(source, flags) => {
			const itemRegex = new RegExp(source, flags);

			// CMT you can actually just get all anchor tags here and match it with the regex,
			// but i don't think that is performance friendly in the long run.
			// eslint-disable-next-line no-undef
			const itemAnchors = [ ...document.querySelectorAll("#search .s-main-slot.s-search-results h2 a") ];
			const item = itemAnchors.filter(a => itemRegex.test(a.href));

			return item[0];

		},
		selectedItemRegex.source,
		selectedItemRegex.flags
	);

	/*
        XXX This is a temporary fix to select items that is a single song like "Time Deyaz" since they
        seem to have a different pattern, but it's not accurate. For example the
        last test i searched for "Sacrifice Weekend" but got "Diamonds Elton John" instead.
     */
	if (!selectedItem.asElement()) {
		selectedItem = await page.waitForSelector(
			`#search .s-main-slot.s-search-results h2 a[href*="${q}"]`,
			{ timeout }
		);
	}

	const selectedItemTitle = await page.evaluate(
		item => item.querySelector("span")?.innerText,
		selectedItem
	);
	const selectedItemLink = await page.evaluate(
		item => item.href,
		selectedItem
	);
	const selectedItemArtist = await page.evaluate(

		// TODO I want to either match "by artist | may 15, 2012" or "by artist". This works
		// but it uses OR, is there another alternative?
		item => item.parentElement?.nextElementSibling.innerText.match(/(?<=by).+(?=\|)|(?<=by).+(?=\|?)/i)[0].trim(),
		selectedItem
	);
	await page.goto(selectedItemLink);

	let priceContainerElement = null;
	if (typeof priceContainerSelector === "object") {
		const priceContainerSelectorVal = Object.values(priceContainerSelector);
		for (const val of priceContainerSelectorVal) {
			try {
				priceContainerElement = await page.waitForSelector(
					val,
					{ timeout }
				);
			} catch (err) {
				continue;
			}
		}
	} else if (typeof priceContainerSelector === "string") {
		priceContainerElement = await page.waitForSelector(
			priceContainerSelector,
			{ timeout }
		);
	}
	if (!priceContainerElement) {
		priceContainerElement = `Price container element not found! Try another pattern! Here's the item's link: ${selectedItemLink}`;
	}

	const foundPrices = await page.evaluate(
		(el, source, flags) => el.innerText.match(new RegExp(source, flags)),
		priceContainerElement,
		pricePattern.source,
		pricePattern.flags
	);

	/**
	 * Object containing data scraped from amazon music.
	 *
	 * @typedef {{
	 * artist : string,
	 * foundPrices: number[],
	 * link   : string,
	 * priceContainerSelector:string,
	 * title  : string
	 * }} AmazonMusicData
	 */

	/**
	 * @type {AmazonMusicData}
	 */
	const AmazonMusicData = {
		artist : selectedItemArtist,
		foundPrices,
		link   : selectedItemLink,
		priceContainerSelector,
		title  : selectedItemTitle
	};

	return AmazonMusicData;
};

const amazonMusic = { scrapeAmazonMusic };

export default amazonMusic;

// DBG some tests
// const browser = await puppeteer.launch({ headless : false });
// const page = await browser.newPage();
// const res = [];
// try {
// 	res.push(await scrapeAmazonMusic(page, "DeprEssIOn chERRy bEACh HousE"));
// 	await new Promise(res => setTimeout(res, 2000));
// 	res.push(await scrapeAmazonMusic(page, "ArTPoP lady GAGA"));
// 	await new Promise(res => setTimeout(res, 1000));
// 	res.push(await scrapeAmazonMusic(page, "time deyaz"));
// 	res.push(await scrapeAmazonMusic(page, "BORN THIS way lady GaGa"));
// 	await new Promise(res => setTimeout(res, 2000));
// 	res.push(await scrapeAmazonMusic(page, "21 Ade"));
// 	res.push(await scrapeAmazonMusic(page, "stay bieber"));
// 	res.push(await scrapeAmazonMusic(page, "12 melanie"));
// 	await new Promise(res => setTimeout(res, 460));
// 	res.push(await scrapeAmazonMusic(page, "sacrifice weekend"));
// 	res.push(await scrapeAmazonMusic(page, "summerboy Ade"));
// 	console.log(res);
// } catch (err) {
// 	console.log(res);
// }

// await browser.close();