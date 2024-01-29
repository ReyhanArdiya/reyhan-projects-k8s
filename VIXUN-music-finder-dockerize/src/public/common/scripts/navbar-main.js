import { mediaQuery } from "./animation.js";

const navbarMain = {
	menu    : document.querySelector("#navbar-main"),
	content : {
		menu  : document.querySelector("#navbar-main-content"),
		icons : {
			profile   : document.querySelector("#icon-account path"),
			home      : document.querySelector("#icon-home path"),
			hamburger : document.querySelector(

				"#icon-hamburger svg"
			),
			hamburgerDiv : document.querySelector("#icon-hamburger"),

			// cart      : document.querySelector("#icon-cart path")

		},
		textContainer : document.querySelector(
			"#navbar-main-content-text-container"
		)
	},
	dropdown : {

		/**
		 * @type {HTMLDivElement}
		 */
		menu : document.querySelector("#navbar-main-dropdown"),
		text : document.querySelectorAll("#navbar-main-dropdown p"),

		/**
		 * @type {"content" | "dropdown"}
		 */
		whereIsTextOnLoad : mediaQuery.medium.matches ?
			"content" :
			"dropdown",

		/**
		 * Shows or hide the dropdown menu.
		 *
		 * @example
		 * ```
		 * if (dropdownExist && smallScreen) {
		 * 	navbarMain.dropdown.control();
		 * }
		 * ```
		 */
		control() {
			this.menu.classList.toggle("navbar-main-dropdown-show");
		},

		/**
		 * Method to move the text inside of
		 * {@link navbarMain.dropdown.menu} to
		 * {@link navbarMain.content.menu} and vice-versa.
		 *
		 * @param {"content" | "dropdown"} where
		 * String to determine where to move text; default is "content".
		 *
		 * @example
		 * ```
		 * if (textInDropdown) {
		 * 	navbarMain.dropdown.moveText("content")
		 * }
		 * ```
		 */
		moveText(where = "content") {
			const [ txtOne, txtTwo ] = navbarMain.dropdown.text;
			if (where === "content") {
				navbarMain.content.icons.hamburgerDiv?.remove();
				navbarMain.content.textContainer.append(txtOne, txtTwo);
			} else if (where === "dropdown") {
				navbarMain.content.menu
					.append(navbarMain.content.icons.hamburgerDiv);
				navbarMain.dropdown.menu.append(txtOne, txtTwo);
			}
		}
	},
	shadowScroll : new IntersectionObserver(
		ent => {
			if (
				!ent[0].isIntersecting &&
				mediaQuery.medium.matches &&
				!navbarMain.menu.classList.contains("navbar-main-shadow")
			) {
				navbarMain.menu.classList.add("navbar-main-shadow");
			} else if (
				ent[0].isIntersecting &&
				mediaQuery.medium.matches &&
				navbarMain.menu.classList.contains("navbar-main-shadow")
			) {
				navbarMain.menu.classList.remove("navbar-main-shadow");
			}
		},
		{
			root       : null,
			rootMargin : "-1px 0px 0px 0px",
			threshold  : 1
		}
	)
};

// Toggle navbar main shadow on sticky
navbarMain.shadowScroll.observe(navbarMain.menu);

// Toggle navbar main shadow when not on original position on load
window.addEventListener("load", () => {
	if (
		mediaQuery.medium.matches &&
		window.scrollY &&
		!navbarMain.menu.classList.contains("navbar-main-shadow")
	) {
		console.log("Medium");
		navbarMain.menu.classList.add("navbar-main-shadow");
	}
});

// Add listener for navbar dropdown menu reveal/hide
navbarMain.content.icons.hamburger.addEventListener(
	"click",
	(() => {
		let ongoing = false;

		return () => {
			if (!ongoing) {
				navbarMain.dropdown.control();
				ongoing = true;
				setTimeout(() => {
					ongoing = false;
				}, 400);
			}
		};
	})()
);

/**
 * Add listener for navbar dropdown text move to content or vice-versa
 * on medium breakpoint.
 */
mediaQuery.medium.addEventListener("change", e => {
			 e.matches ?
		navbarMain.dropdown.moveText("content") :
		navbarMain.dropdown.moveText("dropdown");
});

// Move dropdown text on window load on larger screens
window.addEventListener("load", () => {
	navbarMain.dropdown.moveText(navbarMain.dropdown.whereIsTextOnLoad);
});


export default navbarMain;

