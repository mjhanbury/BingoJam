//#region Imports
// React
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// Styles
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeHigh, faStop, faPlay, faMusic } from '@fortawesome/free-solid-svg-icons'

// Motion
import { motion } from 'framer-motion'
//#endregion Imports

const songs = [
    {
        title: 'Frosty the Snowman',
        artist: 'Jimmy Durante'
    },
    {
        title: 'My Girl',
        artist: 'The Temptations'
    },
    {
        title: 'Shake it Off',
        artist: 'Taylor Swift'
    },
    {
        title: 'Twist and Shout',
        artist: 'The Beatles'
    },
    {
        title: 'Walking on Sunshine',
        artist: 'Katrina and the Waves'
    }
]

const ThemeButton = ({ muted, themeMuted }) => {
    const [playing, play] = useState(false);

 	const theme = useRef(null);

    useEffect(() => {
        if (theme.current) {
            theme.current.volume = 0.5;

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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 1rem',
                    border: 'none',
                    borderRadius: '2rem',
                    color: playing ? 'black' : 'white',
                    backgroundColor: playing ? 'white' : 'rgba(255,255,255,0.25)',
                    fontSize: '1rem',
                    fontStyle: 'italic'
                }}
                onClick={() => play(!playing)}
                >
                <FontAwesomeIcon icon={ faMusic } style={{ fontSize: '1rem' }} />
            </motion.button>

            <audio ref={theme} src="./media/LobbyMusic.mp3" muted={muted || themeMuted} loop />
        </>
    )
}

const MuteButton = ({ mute, muted }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1rem',
                border: 'none',
                borderRadius: '2rem',
                color: !muted ? 'black' : 'white',
                backgroundColor: !muted ? 'white' : 'rgba(255,255,255,0.25)',
                fontSize: '1rem',
                fontStyle: 'italic'
            }}
            onClick={() => mute(!muted)}
        >
            <FontAwesomeIcon icon={muted ? faVolumeMute : faVolumeHigh} style={{ fontSize: '1rem' }} />
        </motion.button>
    )
}

export const ControlsContext = createContext(null);
function Controls({ children }) {
    const [muted, mute] = useState(true);
    const [themeMuted, muteTheme] = useState(false);

    const [remaining, setRemaining] = useState(songs);
    const [history, setHistory] = useState([]);
    const next = useCallback(() => {
        const index = Math.floor(Math.random() * remaining.length);
        setHistory(i => [...i, remaining[index]]);
        setRemaining(i => i.filter(j => j !== remaining[index]));
    }, [remaining, history]);

    return (
        <ControlsContext.Provider value={{ muted, muteTheme, next, history }}>
            { children }
            <Container
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '2rem',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem'
                }}
                >
                <ThemeButton muted={muted} themeMuted={themeMuted} />
                <MuteButton mute={mute} muted={muted} />
            </Container>
        </ControlsContext.Provider>
    )
}
export const useControls = () => useContext(ControlsContext);

export default Controls