import { Container, Row } from 'react-bootstrap'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faForward, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ControlsContext } from './Controls'
import { useCurtain } from './Curtain'

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
            style={{ ...button, width: 130, marginRight: 8 }}
            onClick={() => { navigate('/play/5') }}
        >
            5 sec
            <FontAwesomeIcon icon={ faArrowRotateLeft } style={{ fontSize: '1rem' }} />
        </motion.button>
    )
}

const PlayMore = () => {
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
            style={{ ...button, width: 130, marginLeft: 8 }}
            onClick={() => { navigate('/play/10') }}
        >
            10 sec
            <FontAwesomeIcon icon={ faArrowRotateLeft } style={{ fontSize: '1rem' }} />
        </motion.button>
    )
}

const BingoButton = () => {
    const navigate = useNavigate();
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
                onClick={() => { navigate('/bingo') }}
            >
                Bingo!
                <FontAwesomeIcon icon={faBell} />
            </motion.button>
        </>
    )
}

const NextButton = () => {
    const { navigateWithCurtain } = useCurtain();

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
                onClick={() => { navigateWithCurtain('/countdown') }}
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
            <Row>
                <ReplayButton />
                <PlayMore />
            </Row>
            <BingoButton />
            <NextButton />
        </Container>
    )
}

export default Summary