//#region Imports
// React
import { createContext, Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react'

// Styles
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeHigh, faMusic } from '@fortawesome/free-solid-svg-icons'

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
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem' 
        }}>
            <motion.button 
                animate={ playing ? { opacity: 1 } : { opacity: 0.5 } }
                whileHover={{ scale: 0.9 }} 
                whileTap={{ scale: 1.1 }} 
                style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0 
                }}
                onClick={() => play(i => !i)}
            >
                <FontAwesomeIcon icon={faMusic} className={'fs-1 text-light'} />
            </motion.button>
            <p className={'m-0 text-light text-center'}>Theme</p>
            <audio ref={theme} src="./media/LobbyMusic.mp3" muted={muted || themeMuted} loop />
        </div>
    )
}

const MuteButton = ({ mute, muted }) => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem' 
        }}>
            <motion.button 
                animate={ muted ? { opacity: 0.5 } : { opacity: 1 } }
                whileHover={{ scale: 0.9 }} 
                whileTap={{ scale: 1.1 }} 
                style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0 
                }}
                onClick={() => mute(i => !i)}
            >
                <FontAwesomeIcon icon={ muted ? faVolumeMute : faVolumeHigh } className={'fs-1 text-light'} />
            </motion.button>
            <p className={'m-0 text-light text-center'}>Mute</p>
        </div>
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
            <Container className={'position-absolute px-5 py-4 left-0 bottom-0 d-flex flex-row gap-4'}>
                <ThemeButton muted={muted} themeMuted={themeMuted} />
                <MuteButton mute={mute} muted={muted} />
            </Container>
        </ControlsContext.Provider>
    )
}
export const useControls = () => useContext(ControlsContext);

export default Controls