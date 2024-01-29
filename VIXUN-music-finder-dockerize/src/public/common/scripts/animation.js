/**
 * Use to store mediaQueryList objects for this website's
 * media queries that needs behavior based on breakpoints.
 */
export const mediaQuery = { medium : window.matchMedia("(min-width: 48em") };

export const movementDetector = {

	/**
	 * Calls `callback` when the user swipes on `target` and sends the swipe
	 * direction string as the first argument to `callback`.
	 *
	 * @param {HTMLElement} target The HTML element to be tracked.
	 *
	 * @param {"horizontal" | "vertical"} trackDirection
	 * Use `"horizontal"` to call `callback` when `target` is swiped
	 * horizontally and vice-versa for `"vertical"`.
	 *
	 * @param {(direction: string, e?: TouchEvent) => {}} callback
	 * Callback to be called when `target` is swiped on `trackDirection` where
	 * it will be passed the direction string as the first argument (i.e. `"up"
	 * | "down" | "left" | "right"`) and optionally the `TouchEvent` object as
	 * the second argument.
	 *
	 * @example
	 * ```
	 * // Tracks display top hits' grid horizontally and console log either
	 * // "left" or "right" when the user swipes horizontally.
	 * movementDetector.makeTouchDetector(
	 * 	displayTopHits.grid,
	 * 	"horizontal",
	 * 	dir => console.log(dir)
	 * )
	 * ```
	 */
	makeTouchDetector(target, trackDirection, callback) {
		let currentTouchPos = 0;
		let prevTouchPos = 0;
		let direction = "unknown";

		target.addEventListener(
			"touchmove",
			e => {
				const [ firstFinger ] = e.targetTouches;
				const { pageX, pageY } = firstFinger;

				if (trackDirection === "horizontal") {
					currentTouchPos = pageX;
					direction = currentTouchPos >= prevTouchPos ?
						"right" :
						"left";
				} else if (trackDirection === "vertical") {
					currentTouchPos = pageY;
					direction = currentTouchPos >= prevTouchPos ?
						"down" :
						"up";
				}

				prevTouchPos = currentTouchPos;
				callback(direction, e);
			},
			{ passive : true }
		);
	},

	/**
	 * This function returns a function that when called will return the
	 * scrolling direction of {@link scrollingEl} for vertical or
	 * horizontal scrolling or based on the {@link mediaQuery.medium}
	 * matches property.
	 *
	 * Ideally this function is called after `scrollingEL` is scrolled to return
	 * the appropiate value. This means you usually want to call the returned
	 * function in a `"scroll"` or `touchmove` event so that it can return the
	 * direction multiple times as the `scrollingEl` is scrolled/swiped.
	 *
	 * @param {HTMLElement} scrollingEl
	 * Any scrolling element to detect the direction of.
	 *
	 * @param {"horizontal" | "vertical" | "breakpointMedium"} trackDirection
	 * Track scrolling direction horizontally, vertically or based
	 * on {@link mediaQuery.medium} `matches` property.
	 * If `"breakpointMedium"` is chosen, if the `matches` property is `false`
	 * it will detect vertical scrolling and return either `"down"` or `"up"`.
	 * If `matches` property is `true`, it will detect horizontal scrolling
	 * direction and return either `"right"` or `"left"`.
	 *
	 * @returns {() => "up" | "right" | "down" | "left"}
	 * The scrolling's string direction.
	 *
	 * @example
	 * ```
	 * // Logs the direction of grid whenever it is scrolled vertically.
	 * const gridDetector = movementDetector.makeScrollDetector(
	 * 	displayTopHits.grid, "vertical"
	 * );
	 * displayTopHits.grid.addEventListener("scroll", () => {
	 * 	console.log(gridDetector());
	 * })
	 * ```
	 */
	makeScrollDetector(scrollingEl, trackDirection) {
		let prevScrollPos = 0;
		let currentScrollPos = 0;

		return () => {
			const { medium : { matches : isMediumMatch } } = mediaQuery;
			let direction = "unknown";

			if (
				trackDirection === "horizontal" ||
                 (trackDirection === "breakpointMedium" && isMediumMatch)
			) {
				currentScrollPos = scrollingEl.scrollLeft;
				direction = currentScrollPos >= prevScrollPos ?
					"right" :
					"left";
			} else if (trackDirection === "vertical" ||
                 (trackDirection === "breakpointMedium" && !isMediumMatch)
			) {
				currentScrollPos = scrollingEl.scrollTop;
				direction = currentScrollPos >= prevScrollPos ? "down" : "up";
			}
			prevScrollPos = currentScrollPos;

			return direction;
		};
	}
};

export const animationEffects = {

	/**
	 * Adds parallax effect to an element based on a scrollable element.
	 *
	 * @param {HTMLElement} scrollingEl
	 * Any element that is scrollable, can be the container of the
	 * `parallaxedItemsArr` or any other scrollable element.
	 *
	 * @param {HTMLElement[]} parallaxedItemsArr
	 * Array of any HTML element references that will be parallaxed.
	 *
	 * @param {number} speed
	 * Number to configure `parallaxedItemsArr`s parallax speed.
	 *
	 * @param {"horizontal" | "vertical" | "breakpointMedium"} trackDirection
	 * String to set which scroll direction on {@link scrollingEl} to track and
	 * activate the parallax effect. The way it works is by passing this
	 * argument to {@link movementDetector.makeScrollDetector} and
	 * calling the returned function to get the tracked direction and move the
	 * parallaxed items based on the direction.
	 *
	 * @param {boolean} resetToZeroOnMedium
	 * Boolean to reset `parallaxedItemsArr` position back to `0` the viewport
	 * crosses {@link mediaQuery.medium}. Useful in situtations when you want
	 * `parallaxedItemsArr`'s position to reset when the viewport changes, ex:
	 * the screen changes orientation or resizing the window. Defaults to
	 * `false`.
	 *
	 * @example
	 * ```
	 * // Adds parallax effect to top hits grid that will move its circle
	 * // decorations when the grid is scrolled vertically on small screens or
	 * // horizontally on bigger screens with a speed of 0.05.
	 * animationEffects.addParallax(
	 * 	displayTopHits.grid,
	 * 	displayTopHits.gridCircleDecorations,
	 * 	0.05,
	 * 	"breakpointMedium"
	 * );
	 * ```
	 */
	addParallax(
		scrollingEl,
		parallaxedItemsArr,
		speed,
		trackDirection,
		resetToZeroOnMedium = false
	) {
		let currentTranslateVal = 0;
		const detectScroll = movementDetector.makeScrollDetector(
			scrollingEl,
			trackDirection
		);

		scrollingEl.addEventListener(
			"scroll",
			() => {

				/**
				 * Moves {@link parallaxedItemsArr} opposite of `direction`.
				 *
				 * @param {"up" | "down" | "left" | "right"} direction
				 * String of direction to move {@link parallaxedItemsArr}
				 * opposite from.
				 *
				 * @example
				 * ```
				 * // Moves the parallaxedItemsArr down.
				 * moveElements("up");
				 * ```
				 */
				const moveElements = direction => {
					for (const parallaxedItem of parallaxedItemsArr) {
						switch (direction) {
							case "down" :
								currentTranslateVal -= speed;
								parallaxedItem.style.transform =
                                     `translateY(${currentTranslateVal}px)`;
								break;

							case "up" :
								currentTranslateVal += speed;
								parallaxedItem.style.transform =
                                     `translateY(${currentTranslateVal}px)`;
								break;

							case "left" :
								currentTranslateVal += speed;
								parallaxedItem.style.transform =
                                     `translateX(${currentTranslateVal}px)`;
								break;

							case "right" :
								currentTranslateVal -= speed;
								parallaxedItem.style.transform =
                                     `translateX(${currentTranslateVal}px)`;
								break;
						}
					}
				};

				// Moves the elements opposite of the scroll direction
				moveElements(detectScroll());

				/* Reset position back to 0 whenever viewport crosses the medium
				breakpoint */
				if (resetToZeroOnMedium) {
					mediaQuery.medium.addEventListener(
						"change",
						() => {
							currentTranslateVal = 0;
							moveElements(detectScroll());
						}
					);
				}
			},
			{ passive : true }
		);
	}
};

export default {
	animationEffects,
	mediaQuery,
	movementDetector,
};