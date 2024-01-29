import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const Container = styled.article`
    width: 100%;
    background-color: black;
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 320px;
    position: relative;

    ::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: black;
        opacity: ${({ overlayOpacity }) => overlayOpacity};
    }

	::after {
		content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
		background: linear-gradient(180deg, rgba(0,0,0,0) 0%, ${({ bottomGradient }) => bottomGradient} 100%);
	}

    #poster-item {
        width: 100%;
        height: 400px;
        object-fit: cover;
        transition: opacity ${({ fadeDuration }) => fadeDuration}ms ease-in;
    }

    @media screen and (min-width: calc(768em / 16)) and (min-height: calc(350em / 16)) {
        height: 100vh;

        #poster-item {
            height: auto;
        }
    }

    @media screen and (min-width: calc(768em / 16)) and (min-height: calc(800em / 16)) {
        height: 70vh;

        #poster-item {
            height: auto;
        }
    }
`;

/**
 *
 * @param {{
 * info: string[],
 * switchDuration: number,
 * fadeDuration: number,
 * bottomGradient: string,
 * overlayOpacity?: number
 *}} props
 *
 */
const Poster = ({
	info,
	switchDuration,
	fadeDuration,
	bottomGradient,
	overlayOpacity = 0
}) => {
	const [ whichSrc, setWhichSrc ] = useState(0);
	const imgRef = useRef();
	const isInfoValid = info && info.length;

	const switchImage = () => {
		if (isInfoValid) {
			// Gives the fade-in transition on start
			imgRef.current.style.opacity = 1;

			setTimeout(async () => {
			// Fade out the image first
				await new Promise(resolve => {
					imgRef.current.style.opacity = 0;
					setTimeout(resolve, fadeDuration);
				});

				// Render a new image after prev image is dark
				setWhichSrc(
					prevSrc => prevSrc !== info.length - 1 ? prevSrc + 1 : 0
				);
			}, switchDuration);
		}
	};

	useEffect(
		switchImage,
		[ fadeDuration, info?.length, isInfoValid, switchDuration, whichSrc ]
	);

	return (
		<Container
			fadeDuration={fadeDuration}
			overlayOpacity={overlayOpacity}
			bottomGradient={bottomGradient}
		>
			{isInfoValid ?
				<img
					ref={imgRef}
					id="poster-item"
					src={info[whichSrc]}
					alt=""
				/>			:
				<div id="poster-item" />
			}
		</Container>
	);
};

export default Poster;