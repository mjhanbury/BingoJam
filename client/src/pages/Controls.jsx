//#region Imports
// React
import { createContext, Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react'

// Styles
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeHigh, faMusic, faArrowRotateLeft, faBell, faForward, faRectangleXmark, fa5 } from '@fortawesome/free-solid-svg-icons'

// Motion
import { motion, stagger, useAnimate } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { BingoButton, MuteButton, NextButton, PlayPauseButton, QuitButton, ReplayButton } from '../Buttons';
import { useSelector } from 'react-redux';
//#endregion Imports

/*
const play = useCallback((duration) => {
    if (!controls.current) return;

    muteTheme(true);
    controls.current.currentTime = 0;
    controls.current.play();

    const interval = setInterval(() => {
        controls.current.pause();
    }, duration * 1000);

    return () => clearInterval(interval);
}, []);
*/

function Controls() {
    const { muted, theme, path, controlsVisible, playing } = useSelector(s => s.audio);
    const themeRef = useRef();
    const songRef = useRef();

    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (themeRef.current && themeRef.current.currentTime === 0 && !muted) {
            themeRef.current.volume = 0.25;
            themeRef.current.currentTime = 0;
            themeRef.current.play();
        }
    }, [muted]);

    useEffect(() => {
        if (controlsVisible) {
            animate('button', { y: 0 }, { delay: stagger(0.05) })
        }
        else {
            animate('button', { y: 200 }, { delay: stagger(0.05) })
        }
    }, [controlsVisible]);

    useEffect(() => {
        if (!songRef.current) return;

        if (playing) {
            songRef.current.currentTime = 0;
            songRef.current.play();
        }
        else {
            songRef.current.pause();
        }
    }, [playing]);

    return (
        <Container className={'position-absolute p-5 left-0 bottom-0 mw-100'}>
            <Row>
                <Col xs={2} md={2} className={'d-flex flex-row justify-content-start gap-4'}>
                    <MuteButton />
                </Col>
                <Col xs={8} md={8} className={'d-flex flex-row justify-content-center gap-4'} ref={scope}>
                    <ReplayButton />
                    <PlayPauseButton />
                    <BingoButton />
                    <NextButton />
                </Col>
                <Col xs={2} md={2} className={'d-flex flex-row justify-content-end gap-4'}>
                    <QuitButton />
                </Col>
            </Row>
            <audio ref={themeRef} src="./media/LobbyMusic.mp3" muted={muted || !theme} loop />
            <audio ref={songRef} src={path} muted={muted} loop />
        </Container>
    )
}

export default Controls