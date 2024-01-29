import { displayBrowse } from "./display-objects.js";
import makeStatusToggler from "./toggle-status.js";

let res;
let canAppendSongs = true;

const removeAllCards = () => {
	for (const card of [ ...displayBrowse.songCard.cards ]) {
		card.remove();
	}
};

/**
 * Removes all curent cards from DOM then calls
 * {@link displayBrowse.songCard.addCards} and appends the results or a warning.
 *
 * @param {string} q
 * The query, if omitted it will default to empty string which returns a set of
 * random songs.
 *
 * @example
 * ```
 * const searchBar = document.querySelector("#form-search-songs");
 *
 * searchBar.addEventListener(
 * 	"submit",
 * 	function(e) {
 * 		e.preventDefault();
 * 		appendSongs(e.target.elements.q.value);
 * 	}
 * );
 * ```
 */
const appendSongs = async (q = "") => {
	if (canAppendSongs) {
		canAppendSongs = false;

		const { songCard: { container }, search: { notFound } } = displayBrowse;

		const oldProgressBar = container.querySelector("svg");
		if (oldProgressBar) {
			oldProgressBar.remove();
		}

		const progressBar = new ProgressBar.Circle(
			container,
			{
				color    : "#ff0000",
				duration : 3000,
				easing   : "easeInOut",
				from     : { color : "#ff0000" },
				step(state, circle) {
					circle.path.setAttribute("stroke", state.color);
				},
				strokeWidth : 5,
				to          : { color : "#a129ff" },
			}
		);

		if (container.classList.contains("no-songs")) {
			container.classList.remove("no-songs");
		}
		if (displayBrowse.search.sortLabels.activeLabel) {
			displayBrowse.search.sortLabels.clearActive();
		}
		removeAllCards();

		try {
			progressBar.animate(1);
			q = q.trim();
			res = await axios.get("/songs", {
				params  : { q },
				timeout : 10000
			});
			progressBar.destroy();
			removeAllCards();

			if (res.data && res.data.length) {
				displayBrowse.songCard.addCards(res.data);
				displayBrowse.songCard.info.observeOverflow(false, 0.8);
			} else {
				notFound.firstElementChild.innerText = "NOTHING FOUND";
				container.classList.add("no-songs");
			}
		} catch (err) {
			progressBar.destroy();
			removeAllCards();
			notFound.firstElementChild.innerText = "SOMETHING\nWENT WRONG";
			container.classList.add("no-songs");
		}

		canAppendSongs = true;
	}
};

// Receive songs data atleast once on startup from this callback
window.addEventListener("load", () => appendSongs());

const { form: searchBar } = displayBrowse.search;

searchBar.addEventListener(
	"submit",
	function(e) {
		e.preventDefault();
		appendSongs(e.target.elements.q.value);
	}
);

document.querySelector("#display-browse-categories").addEventListener(
	"click",
	function(e) {
		if (e.target.classList.contains("icon-category") && canAppendSongs) {
			const { title } = e.target.firstElementChild;
			searchBar.firstElementChild.value = title;
			appendSongs(title);
		}
	}
);

// Toggler for sort label status colors
displayBrowse.search.sortLabels.container.addEventListener("click", e => {
	let label;

	// XXX this works but it looks so weird tho, fiind another way if you can
	/* This if else is to target the e.target's parent that is
	   #browse-sort-label. The if is when the user clicks on the paragraph while
	   the else is when the user clicks on the arrow svg. If the else wasn't
	   used, clicking the arrow svg would change #browse-sort-label-arrow div
	   which only causes the arrow color to change and not the entire label */
	if (e.target.parentElement.classList.contains("browse-sort-label")) {
		label = e.target.parentElement;
	} else {
		label = e.target.parentElement.parentElement;
	}

	if (label.classList.contains("browse-sort-label")) {
		const { search: { sortLabels } } = displayBrowse;
		const labelToggler = makeStatusToggler(label, {
			statusOff : "browse-sort-label-desc",
			statusOn  : "browse-sort-label-asc",
		});

		sortLabels.activeLabel = labelToggler();

		for (const label of sortLabels.labels) {
			if (label !== sortLabels.activeLabel) {
				makeStatusToggler(label, {
					statusOff : "browse-sort-label-desc",
					statusOn  : "browse-sort-label-asc",
				})(true);
			}
		}
	}
});

// Sort labels sorting logic
displayBrowse.search.sortLabels.container.addEventListener(
	"click",
	function(e) {
		if (!(e.target.id === "browse-searchbar-sorts")) {
			const { search: { sortLabels: { activeLabel } } } = displayBrowse;

			const labelText = activeLabel?.querySelector("p")
				                          ?.innerText.toLowerCase();
			const sortStatus = activeLabel.classList[1].slice(18);

			let songs = res.data;
			if (labelText === "price") {
				const noPrices = songs.filter(s => s.price === null);
				const withPrices = songs.filter(s => s.price !== null);
				songs = [ ...withPrices, ...noPrices ];
			}

			const sorted = songs.sort((songA, songB) => {
				if (labelText !== "price") {
					songA = songA[labelText]?.toLowerCase();
					songB = songB[labelText]?.toLowerCase();

					if (sortStatus === "asc") {
						if (songA > songB) {
							return 1;
						} else if (songA === songB) {
							return 0;
						} else {
							return -1;
						}
					} else if (sortStatus === "desc") {
						if (songB > songA) {
							return 1;
						} else if (songA === songB) {
							return 0;
						} else {
							return -1;
						}
					}
				} else {
					songA = +songA[labelText]?.slice(1);
					songB = +songB[labelText]?.slice(1);

					if (sortStatus === "asc") {
						return songA - songB;
					} else if (sortStatus === "desc") {
						return songB - songA;
					}
				}
			});

			removeAllCards();
			displayBrowse.songCard.addCards(sorted);
			displayBrowse.songCard.info.observeOverflow(false, 0.8);
		}
	}
);