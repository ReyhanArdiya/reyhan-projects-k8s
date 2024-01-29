import SearchContext from "../../../../context/search-context";
import styled from "styled-components";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const Container = styled.section`
	background: ${({ background }) => background};
	min-height: 500px;
	height: 80vmax;
	overflow-y: auto;
	position: relative;
	z-index: 2;
	padding: 1em 0;

	::-webkit-scrollbar {
		display: none;
	}
`;

const SearchResults = styled.section`
	display: grid;
	gap: 0.5em;
	grid-auto-rows: min-content;
	grid-template-columns: 1fr 1fr 1fr;
	justify-items: center;
	align-items: center;
	height: max-content;
	margin: 0 auto 1em auto;
	width: 85%;

	> * {
		max-width: 100%;
	}

	@media screen and (min-width: calc(768em / 16)) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		max-width: 850px;

		> * {
			grid-area: span 1/ span 1 !important;
		}
	}
`;

const ShowImage = styled.img`
	border-radius: 0.25em;
	box-shadow: 0px 0.2em 0.315em 0px #000000a1;

	@keyframes scaleImage {
		from {
			transform: scale(0);
		}

		to {
			transform: scale(1);
		}
	}

	transform-origin: center;
	animation: scaleImage 0.3s 1 ease-out;
	transition: transform 0.3s ease-out;

	:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
`;

/**
 * When given a string array of img sources, make the first img big by grid-area
 * span inline style and every img after that on `stepOne` and `stepTwo`.
 *
 * @param {string[]} srcArr
 *
 * @param {number} spanSize
 *
 * @param {number} stepOne
 *
 * @param {number} stepTwo
 *
 * @example
 * Make img 0, 4, 6, 10, 12... big
 * ```js
 *	createSizedImages(srcArr, 4, 2);
 * ```
 *
 */
const createSizedImages = (srcArr, spanSize, stepOne, stepTwo) => {
	let makeBig = 0;
	let step = 0;

	return srcArr.map(({ src, name, officialSite }, i) => {
		let gridArea;

		if (i === makeBig) {
			gridArea = `span ${spanSize}/ span ${spanSize}`;
			step = step === stepTwo || !step ? stepOne : stepTwo;
			makeBig += step;
		}

		return (
			<ShowImage
				src={src}
				alt={name}
				title={name}
				key={uuidv4()}
				style={{ gridArea }}
				loading="lazy"
				data-site={officialSite}
			/>
		);
	});
};

const buildImages = searchResults => {
	const filteredSearchResults = [];

	for (const { src, name, officialSite } of searchResults) {
		if (src) {
			filteredSearchResults.push({
				name,
				officialSite,
				src
			});
		}
	}

	return createSizedImages(filteredSearchResults, 1, 4, 2);
};

const goToImgSite = ({ target : { id, dataset : { site } } }) => {
	if (id !== "search-results" && site) {
		window.open(site);
	}
};

const SearchArea = ({ background, SearchAreaRef }) => {
	const { searchResults } = useContext(SearchContext);

	return (
		<Container
			id="search-area"
			background={background}
			ref={SearchAreaRef}
		>
			<SearchResults
				onClick={goToImgSite}
				id="search-results"
			>
				{buildImages(searchResults)}
			</SearchResults>
		</Container>
	);
};

export default SearchArea;