import styled from "styled-components";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Container = styled.nav`
    --font-size: 0.75em;
    align-items: center;
    display: flex;
    font: 500 1em "Poppins", sans-serif;
    justify-content: space-between;
    padding: 0.75em;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    font-size: var(--font-size);
    -webkit-tap-highlight-color: transparent;

    #navbar-icon {
        height: 1.5em;
        flex-grow: 0.2;
        align-items: center;
        display: flex;
        justify-content: flex-start;
    }

    #navbar-icon > *:first-child {
        cursor: pointer;
        width: 1.5em;
        height: 1.5em;
        fill: white;
    }

    #navbar-links {
        color: #ffffff7a;
        font-family: inherit;
        align-items: center;
        display: flex;
        justify-content: space-evenly;
        gap: 1em;
    }

    #navbar-links > * {
        cursor: pointer;
        transition-property: color, border-bottom;
        transition-duration: 0.15s;
        transition-timing-function: ease-in;
    }

    #navbar-links > *:nth-child(${({ activeLink }) => activeLink}),
    #navbar-links > *:hover {
        color: white;
        border-bottom: 0.15em solid white;
    }

    @media screen and (min-width: calc(768em / 16)) {
        font-size: calc(var(--font-size) + 0.25em);
        padding-left: 1em;
        padding-right: 1em;
    }

    @media screen and (min-width: calc(1440em / 16)) {
        font-size: calc(var(--font-size) + 0.5em);
    }
`;

const Navbar = ({ links, icon, iconLink }) => {
	const [ activeLink, setActiveLink ] = useState(1);

	links = links.map(
		(link, i) => <p
			data-which={i + 1}
			key={uuidv4()}
		             >{link}</p>
	);

	const changeActiveLink = ({ target }) => {
		if (target.id !== "navbar-links") {
			setActiveLink(target.dataset.which);
		}
	};

	return (
		<Container
			activeLink={activeLink}
			id="navbar-main"
		>
			<a
				target={0}
				href={iconLink}
				id="navbar-icon"
			>
				{icon}
			</a>
			<div
				onClick={changeActiveLink}
				id="navbar-links"
			>
				{links}
			</div>
		</Container>
	);
};

export default Navbar;