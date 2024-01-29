import Intro from "./Header/Intro";
import Poster from "./Header/Poster";
import SearchArea from "./Search/SearchArea";
import SearchBar from "./Search/SearchBar";
import SearchContext from "../../../context/search-context";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useReducer, useRef, useState } from "react";

const Header = styled.header`
	height: 100%;
	align-items: center;
	display: flex;
	justify-content: center;
	position: relative;

	#home-intro {
		position: absolute;
		z-index: 5;
		align-items: center;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		row-gap: 1em;
	}
`;

// TODO change this to useContext later
const SearchAreaBackground = "rgba(78,78,78,1)";

const searchResultsReducer = (prevResults, newResults) => {
	return newResults.map(({ show }) => {
		const { name, officialSite, image } = show;
		const img = image?.medium || image?.original;

		return {
			name,
			officialSite,
			src : img
		};
	});
};

const Home = () => {
	const [ info, setInfo ] = useState([]);
	const [ searchResults, dispatchSearchResults ] = useReducer(
		searchResultsReducer,
		[]
	);
	const SearchAreaRef = useRef();

	/* CMT The original goal of this function was to get trending shows, but I can't
     seem to find an API for it that doesn't require authentication, so Imma fake it for now*/
	const getTrendingShows = async (...shows) => {
		try {
			const trending = [];

			for (let i = 0; i < shows.length; i++) {
				try {
					const res = await axios.get(
						"https://api.tvmaze.com/singlesearch/shows",
						{ params : { q : shows[i] } }
					);

					trending.push(res.data.image.original);
				} catch (err) {
					console.error(err);
				}
			}

			setInfo(trending);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => getTrendingShows("the cuphead show", "euphoria", "what we do in the shadows", "WandaVision"), []);

	return (
		<SearchContext.Provider value={{
			SearchAreaRef,
			searchResults
		}}
		>
			<Header id="home-header">
				<div id="home-intro">
					<Intro
						title="SHOW SEARCH"
						subtitle="Search for the shows you like!"
					/>
					<SearchBar dispatchSearchResults={dispatchSearchResults}/>
				</div>
				<Poster
					overlayOpacity={0.7}
					switchDuration={5000}
					fadeDuration={1000}
					info={info}
					bottomGradient={SearchAreaBackground}
				/>
			</Header>
			<SearchArea
				background={SearchAreaBackground}
				SearchAreaRef={SearchAreaRef}
			/>
		</SearchContext.Provider>
	);
};

export default Home;