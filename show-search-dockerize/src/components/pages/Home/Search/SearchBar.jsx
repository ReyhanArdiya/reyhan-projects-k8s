import ErrorModal from "../../../common/ErrorModal";
import SearchContext from "../../../../context/search-context";
import axios from "axios";
import styled from "styled-components";
import { useContext, useState } from "react";

const Container = styled.form`
    --font-size: 1em;
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 2em;
    border-radius: 1em;
    font-size: var(--font-size);

    .searchbar-input {
        border-radius: inherit;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        font: 400 1em "Poppins";
        height: 100%;
        max-width: 80%;
        outline: none;
        border: none;
        padding: 0 0.5em;
    }

    .searchbar-icon {
        cursor: pointer;
        border-radius: inherit;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        flex-grow: 1;
        height: 100%;
        background: #D1D1D1;
        align-items: center;
        display: flex;
        justify-content: center;
    }

    /* searchbar icon overlay on hover/active */
    .searchbar-icon {
        cursor: pointer;
        position: relative;
        border: none;
        outline: none;
    }

    .searchbar-icon::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        background-color: black;
        transition: opacity 0.25s linear;
        border-radius: inherit;
    }

    .searchbar-icon svg {
        height: 1.25em;
        width: 1.25em;
    }

    .searchbar-icon:hover::before {
        opacity: 0.2;
    }

    .searchbar-icon:active::before {
        opacity: 0.4;
        transition: opacity 0.05s linear;
    }

    @media screen and (min-width: calc(768em / 16)) {
        font-size: calc(var(--font-size) + 0.5em);
    }

    @media screen and (min-width: calc(1440em / 16)) {
        font-size: calc(var(--font-size) + 1em);
    }
`;

const SearchIcon =
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
	</svg>;


const searchTVMaze = async q => {
	const res = await axios.get("https://api.tvmaze.com/search/shows", { params : { q } });

	return res.data;
};

let canSearch = true;
const SearchBar = ({ dispatchSearchResults }) => {
	const { SearchAreaRef : { current } } = useContext(SearchContext);
	const [ validity, setValidity ] = useState({
		isValid : true,
		message : "",
		title   : ""
	});

	const searchShows = async e => {
		e.preventDefault();
		const { target: { elements: [ { value: input } ] } } = e;

		if (!input) {
			setValidity({
				isValid : false,
				message : "Make sure to search for something",
				title   : "No Input"
			});
		} else if (canSearch) {
			try {
				dispatchSearchResults(
					await searchTVMaze(input)
				);
				current.scrollIntoView({ behavior : "smooth" });
				canSearch = false;
				setTimeout(() => canSearch = true, 1_000);
			} catch (err) {
				console.error(err);
			}
		}
	};

	const closeModal = () => {
		setValidity({ isValid : true });
	};

	return (
		<>
			{!validity.isValid &&
				<ErrorModal
					title={validity.title}
					message={validity.message}
					onButtonClick={closeModal}
				/>
			}
			<Container
				onSubmit={searchShows}
				className="searchbar"
			>
				<input
					type="text"
					className="searchbar-input"
				/>
				<button className="searchbar-icon">{SearchIcon}</button>
			</Container>
		</>
	);
};

export default SearchBar;