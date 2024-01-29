import Song from "../../models/song.js";
import aggregateAndSave from "./utils/aggregate-save.js";
import newPageRandomUA from "./utils/user-agent.js";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

/**
 * This function will aggregate the song's data found from querying `q` and
 * saves it to the DB if no duplicate was detected. Whether this function saves
 * the found song or not, it will always return an array of song documents from
 * the results of querying using `q`.
 *
 * @param {string} q
 * A flexible case insensitive string that will be used when aggregating
 * the song's data and querying the song database. Since the `q` will be queried
 * agains a `SongDocument.desc` property, you can query anything that is available
 * in that property's string. Examples:
 * 1. "The hours beach house bloom"
 * 2. "song depression space beach cherry house"
 * 3. "CHROM gAgA lAd 11 bOy suMMer"
 * 4. "2015-08-28"
 * 5. "$4.99"
 * 6. "Ad ad eOm ndY ica Ou aNd", interestingly this one could include sour
 * candy by lady gaga if present in database.
 * 7. "Rt op tp ar u y gu uy aga g" this one could include G.U.Y by lady
 * gaga if present.
 * 8. "He ek iw no ll He cH mO th" this one could include all we know by
 * the chainsmokers if present.
 *
 * @param {import("puppeteer").Page} page
 * An optional `puppeteer.Page`. If omitted it will use this module's own page.
 * This function will close the `page` at the end.
 *
 * @returns A promise that resolves into the results of querying the database
 * sorted from the most relevant results.
 *
 * @example
 * Only save this new song if the entry doesn't exist in the database. Whether
 * it was saved or not, this function will always return the results of
 * the query.
 * ```js
 * console.log(await requestSongs("the hours beach house bloom"));
 * ```
 */
const requestSongs = async (q, page) => {
    try {
        page ??= await newPageRandomUA(browser);
        await aggregateAndSave(q, page);
    } catch (err) {
        /* nothing */
    }

    return await Song.querySongs(q);
};

export default requestSongs;

// DBG some requestSongs tests
// console.log(await requestSongs("The hours beach house bloom"));
// console.log(await requestSongs("song depression space beach cherry house"));
// console.log(await requestSongs("CHROM gAgA lAd 11 bOy suMMer"));
