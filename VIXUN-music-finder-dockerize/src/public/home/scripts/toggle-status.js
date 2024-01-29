/**
 * Returns a function that controls the toggling of two classes for an
 * `element`.
 *
 * @param {HTMLElement} element
 * The `element` to be controled.
 *
 * @param {{statusOn: string, statusOff: string}} options
 * An object to configure which status to be toggled or if `element` will be
 * "deactivated". `statusOn` will be toggled when the element is "on" or when it
 * doesn't have `statusOn` AND `statusOff` (for example when it is deactivated).
 * `statusOff` will be toggled when the element is "off" which happens after
 * this function is called when `element.classlist.contains(statusOn) === true`.
 *
 * @returns {(deactivate?: boolean) => null | element}
 * Returns a function that takes `deactivate`. If `deactivate` is `true`,
 * `element`'s `statusOn` and `statusOff` that was passed earlier will be
 * `classlist.remove()`d which causes `element` to be "deactivated". Defaults to
 * `false`.
 *
 * @example
 * ```
 * // Make the toggler for sort labels
 * const labelToggler = toggleStatus(label, {
 * statusOn  : "browse-sort-label-asc",
 * statusOff : "browse-sort-label-desc",
 * });
 *
 * // Toggle between the classes
 * sortLabels.activeLabel = labelToggler();
 * ```
 */
export const makeStatusToggler = (element, {
	statusOn,
	statusOff
}) => {
	const { classList } = element;

	return (deactivate = false) => {
		if (deactivate) {
			classList.remove(
				statusOn,
				statusOff
			);

			return null;
		} else if (
			!classList.contains(statusOn) &&
        !classList.contains(statusOff)
		) {
			classList.toggle(statusOn);
		} else {
			classList.toggle(statusOn);
			classList.toggle(statusOff);
		}

		return element;
	};
};

export default makeStatusToggler;
