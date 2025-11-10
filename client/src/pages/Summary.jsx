import { Container } from 'react-bootstrap'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRepeat, faBell, faForward } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ControlsContext } from './Controls'

const button = {
    width: 280,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: '1px white solid',
    borderRadius: 25,
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
}

const ReplayButton = () => {
    const navigate = useNavigate();

    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: {
                duration: 0.5,
            }}}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            whileTap={{ scale: 0.9, rotate: 5 }}
            style={button}
            onClick={() => { navigate('/play') }}
        >
            Replay
            <FontAwesomeIcon icon={ faRepeat } style={{ fontSize: '1rem', marginLeft: '0.5rem' }} />
        </motion.button>
    )
}

const BingoButton = () => {
    return (
        <>
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: {
                    duration: 0.5,
                    delay: 0.1
                }}}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                style={button}
            >
                Bingo!
                <FontAwesomeIcon icon={faBell} />
            </motion.button>
        </>
    )
}

const NextButton = () => {
    return (
        <>
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: {
                    duration: 0.5,
                    delay: 0.2
                }}}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                style={button}
            >
                Next
                <FontAwesomeIcon icon={ faForward } style={{ fontSize: '1rem', marginLeft: '0.5rem' }} />
            </motion.button>
        </>
    )
}

function Summary() {
    const { muteTheme } = useContext(ControlsContext);

    useEffect(() => {
        muteTheme(false);
    }, []);

    return (
        <Container className='h-100 d-flex flex-column justify-content-center align-items-center gap-3'>
            <ReplayButton /> {/* Add a play more button */}
            <BingoButton />
            <NextButton />
        </Container>
    )
}

export default Summary