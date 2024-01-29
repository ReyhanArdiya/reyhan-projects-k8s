import styled from "styled-components";

const Container = styled.header`
    --font-size: 1em;
    color: white;
    font-size: var(--font-size);
    text-align: center;

    h1 {
        font: 400 1.75em "Archivo Black";
    }

    h2 {
        font: 400 0.8em "Poppins";
    }

    @media screen and (min-width: calc(768em / 16)) {
        font-size: calc(var(--font-size) + 0.5em);
    }

    @media screen and (min-width: calc(1440em / 16)) {
        font-size: calc(var(--font-size) + 1em);
    }
`;

const Intro = ({ title, subtitle }) => {
	return (
		<Container className="intro">
			<h1>{ title }</h1>
			<h2>{ subtitle }</h2>
		</Container>
	);
};

export default Intro;