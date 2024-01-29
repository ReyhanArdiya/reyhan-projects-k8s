import core from "../../common/scripts/index.js";
import { displayTopHits } from "./display-objects.js";

const { animation: { animationEffects } } = core;

// Add song cards from database to top hits grid
window.addEventListener("load", async function() {
	const progressBar = new ProgressBar.Line(
		displayTopHits.grid,
		{
			color    : "#ff0000",
			duration : 3000,
			easing   : "easeInOut",
			from     : { color : "#ff0000" },
			step(state, circle) {
				circle.path.setAttribute("stroke", state.color);
			},
			strokeWidth : 5,
			svgStyle    : { "grid-column-end" : "span 9" },
			to          : { color : "#a129ff" }
		}
	);
	try {
		progressBar.animate(1);
		const topHits = (await axios.get("/songs/top", { timeout : 10000 })).data;
		progressBar.destroy();
		const {
			albums: { data: albums },
			artists: { data: artists },
			tracks: { data: tracks }
		} = topHits;

		const albumsExt = albums.map(a => {
			const {
				cover_big: image,
				artist: { name: artist },
				title
			} = a;

			return {
				image,
				query : `${title} ${artist}`
			};
		});
		const artistsExt = artists.map(a => {
			const {
				picture_big: image,
				name: artist
			} = a;

			return {
				image,
				query : `${artist}`
			};
		});
		const tracksExt = tracks.map(s => {
			const {
				album  : { cover_big : image, title: album },
				title,
				artist : { name : artist }
			} = s;

			return {
				image,
				query : `${title} ${artist} ${album}`
			};
		});

		displayTopHits.addDatabaseSongs(
			[ ...tracksExt, ...albumsExt, ...artistsExt ]
		);
	} catch (err) {
		progressBar.destroy();
		displayTopHits.grid.classList.add("top-hits-error");
	}
});

// Add parallax to display top hits' circle decorations.
animationEffects.addParallax(
	displayTopHits.grid,
	displayTopHits.gridCircleDecorations,
	0.05,
	"breakpointMedium",
	true
);