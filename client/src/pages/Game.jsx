import { Col, Row, Container } from "react-bootstrap";

import { motion } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faRepeat } from "@fortawesome/free-solid-svg-icons";

const ReplayButton = () => {
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
                >
                Replay
                <FontAwesomeIcon icon={ faRepeat } style={{ fontSize: '1rem', marginLeft: '0.5rem' }} />
            </motion.button>
        </>
    )
}

const BingoButton = () => {
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
                className="animated-gradient"
                >
                Bingo!
            </motion.button>
        </>
    )
}

const NextButton = () => {
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
                >
                Next
                <FontAwesomeIcon icon={ faForward } style={{ fontSize: '1rem', marginLeft: '0.5rem' }} />
            </motion.button>
        </>
    )
}

function Game() {
    return (
        <Container className="h-100">
            <Col className="h-100 d-flex justify-content-center align-items-center">
                <Row>
                    
                </Row>
                <Row className="gap-3">
                    <ReplayButton />
                    <BingoButton />
                    <NextButton />
                </Row>
            </Col>
        </Container>
    )
}

export default Game