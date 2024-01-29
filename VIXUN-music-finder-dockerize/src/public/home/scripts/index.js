import "./append-songs.js";
import "./top-hits.js";
import core from "../../common/scripts/index.js";
import makeStatusToggler from "./toggle-status.js";
import { mediaQuery } from "../../common/scripts/animation.js";
import navbarMain from "../../common/scripts/navbar-main.js";
import {
	displayAds,
	displayBrowse
} from "./display-objects.js";

const { animation: { animationEffects } } = core;

// TODO seperate each regions into modules

// #region -------------------DISPLAY ADS LOGIC---------------------------------

// DBG cute kitty placeholders :3
displayAds.appendNewAd("https://placekitten.com/200/300");
displayAds.appendNewAd("https://placekitten.com/300/200");
displayAds.appendNewAd("https://placekitten.com/300/300");
displayAds.appendNewAd("https://placekitten.com/400/300");
displayAds.appendNewAd("https://placekitten.com/300/400");
displayAds.appendNewAd("https://placekitten.com/500/500");

displayAds.trackCurrentDisplayedAd();

displayAds.autoScroll(5000);

// #endregion ================DISPLAY ADS LOGIC=================================

// #region -------------------DISPLAY BROWSE CATEGORIES TOGGLER-----------------

/* CMT the toggler for icons and labels seem to have a very similar structure,
could refactor it probably */
// Toggler for category icons status colors
displayBrowse.categories.container.addEventListener("click", e => {
	if (
		!e.target.classList.contains("icon-category") &&
		e.target.id !== "display-browse-categories"
	) {
		const icon = e.target.parentElement;
		const { categories } = displayBrowse;
		const iconToggler = makeStatusToggler(icon, {
			statusOff : "icon-category-off",
			statusOn  : "icon-category-on",
		});

		categories.activeLabel = iconToggler();

		for (const icon of categories.icons) {
			if (icon !== categories.activeLabel) {
				makeStatusToggler(icon, {
					statusOff : "icon-category-off",
					statusOn  : "icon-category-on",
				})(true);
			}
		}
	}
});

// #endregion ================DISPLAY BROWSE CATEGORIES TOGGLER=================

// #region -------------------SONG CARDS LOGIC----------------------------------

displayBrowse.songCard.info.observeOverflow(false, 0.8);

animationEffects.addParallax(
	displayBrowse.songCard.container,
	displayBrowse.songCard.circleDecos,
	0.05,
	"vertical",
	false
);


// #endregion ================SONG CARDS LOGIC==================================

// #region -------------------PAGE FOOTER LOGIC---------------------------------

const pageFooter = document.querySelector("#page-footer");
let isFooterIntersecting = false;
const pageFooterIntObs = new IntersectionObserver(([ ent ]) => {
	if (!mediaQuery.medium.matches) {
		if (
			ent.isIntersecting &&
			navbarMain.menu.classList.contains("navbar-main-shadow")
		) {
			navbarMain.menu.classList.remove("navbar-main-shadow");
		} else if (
			!ent.isIntersecting &&
			!navbarMain.menu.classList.contains("navbar-main-shadow")
		) {
			navbarMain.menu.classList.add("navbar-main-shadow");
		}

		isFooterIntersecting = ent.isIntersecting;
	}
}, { threshold : 0.9 });

// Toggle sticky navbar main shadow when nearing the end of page
pageFooterIntObs.observe(pageFooter);

// Toggle navbar main shadow when crossing breakpoint
mediaQuery.medium.addEventListener("change", e => {
	if (
		!isFooterIntersecting &&
		!e.matches &&
		!navbarMain.menu.classList.contains("navbar-main-shadow")
	) {
		navbarMain.menu.classList.add("navbar-main-shadow");
	 }
});

// #endregion ================PAGE FOOTER LOGIC=================================