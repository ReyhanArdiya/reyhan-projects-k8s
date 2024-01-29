import ReactDOM from "react-dom";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    top: 0;
    z-index: 50;
    width: 100vw;
    height: 100vh;
    background-color: #000000ab;
    align-items: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
`;

const Content = styled.article`
    --font-size: 1em;
    width: 70%;
    height: max-content;
    background-color: white;
    display: grid;
    grid-template-areas:
        "title"
        "message";
    grid-template-rows: max-content 10em;
    font-size: var(--font-size);
    text-align: center;

    .error-title {
        grid-area: title;
        align-items: center;
        display: flex;
        justify-content: center;
        font: 700 2em "Poppins";
        padding-top: 0.25em;
    }

    .error-message {
        grid-area: message;
        overflow-y: auto;
        font: 400 1em "Poppins";
        padding: 0 0.25em;
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .error-message::-webkit-scrollbar {
        display: none;
    }

    button {
        font: 700 1.25em "Poppins";
        background-color: #a1aaaa;
        border: none;
        outline: none;
    }

    /* button overlay on hover/active */
    button {
        cursor: pointer;
        position: relative;
    }

    button::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        background-color: black;
        transition: opacity 0.25s linear;
    }

    button:hover::before {
        opacity: 0.2;
    }

    button:active::before {
        opacity: 0.4;
        transition: opacity 0.05s linear;
    }

    @media screen and (min-width: calc(768em / 16)) {
        font-size: calc(var(--font-size) + 0.25em);
    }

    @media screen and (min-width: calc(1440em / 16)) {
        font-size: calc(var(--font-size) + 0.5em);
    }
`;

const ErrorModal = ({ onButtonClick, title, message }) => {
	return ReactDOM.createPortal(
		<Container className="modal-error">
			<Content>
				<h2 className="error-title">{title}</h2>
				<p className="error-message">{message}</p>
				<button onClick={onButtonClick}>Okay</button>
			</Content>
		</Container>,
		document.body
	);
};

export default ErrorModal;