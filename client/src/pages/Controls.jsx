import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeHigh, faStop, faPlay } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

const ThemeButton = ({ muted }) => {
    const [playing, play] = useState(false);

 	const theme = useRef(null);

    useEffect(() => {
        if (theme.current) {
            if (playing) {
                theme.current.currentTime = 0;
                theme.current.play();
            } else {
                theme.current.pause();
            }
        }
    }, [playing]);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                style={{
                    width: 150,
                    height: 50,
                    backgroundColor: 'white',
                    borderRadius: 25,
                    border: 'none',
                    fontSize: '1rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
                onClick={() => play(!playing)}
                >
                Theme
                <FontAwesomeIcon icon={ playing ? faStop : faPlay } style={{ fontSize: '1rem', marginLeft: '0.5rem' }} />
            </motion.button>

            <audio ref={theme} src="./media/LobbyMusic.mp3" muted={muted} />
        </>
    )
}

const MuteButton = ({ mute, muted }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                width: 50,
                height: 50,
                backgroundColor: 'white',
                borderRadius: 25,
                border: 'none',
                fontSize: '2rem',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onClick={() => mute(!muted)}
        >
            <span id="rewardId" />
            <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeHigh} style={{ fontSize: '1rem' }} />
        </motion.button>
    )
}

function Controls() {
    const [muted, mute] = useState(true);

    return (
        <Container
            style={{
                position: 'absolute',
                bottom: '2rem',
                right: '2rem',
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem'
            }}
        >
			<MuteButton mute={mute} muted={muted} />
            <ThemeButton muted={muted} />
        </Container>
    )
}

export default Controls