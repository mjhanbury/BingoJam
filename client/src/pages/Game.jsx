import { Col, Row, Container } from "react-bootstrap";

import { motion } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faForward, faRepeat } from "@fortawesome/free-solid-svg-icons";

const ReplayButton = () => {
    return (
        <>
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 5.5 }}

                whileHover={{ scale: 1.1, rotate: 0, backgroundColor: 'white' }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                style={{
                    width: 200,
                    height: 50,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    border: '1px white solid',
                    borderRadius: 25,
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 5.6 }}

                whileHover={{ scale: 1.1, rotate: 0, backgroundColor: 'white' }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                style={{
                    width: 200,
                    height: 50,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    border: '1px white solid',
                    borderRadius: 25,
                    fontSize: '1rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
                className="animated-gradient"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 5.7 }}
    
                whileHover={{ scale: 1.1, rotate: 0, backgroundColor: 'white' }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                style={{
                    width: 200,
                    height: 50,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    border: '1px white solid',
                    borderRadius: 25,
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

const MusicNote = ({ size, duration }) => {
    return (
        <motion.svg initial={'hidden'} animate={'visible'} height={size} width={size} style={{ marginBottom: 24 }}>
            <motion.circle
                cx={size / 6 + 10} cy={size - size / 6 - 10} r={size / 6}
                stroke={'white'}
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            pathLength: { duration, ease: 'linear' },
                            opacity: { duration: 0.01 },
                        }
                    }
                }}
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <motion.circle
                cx={size - size / 6 - 10} cy={size - size / 6 - 10} r={size / 6}
                stroke={'white'}
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            pathLength: { duration, ease: 'linear' },
                            opacity: { duration: 0.01 },
                        }
                    }
                }}
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                    scaleY: -1,
                    transformOrigin: 'center'
                }}
            />

            <motion.line
                x1={size / 3 + 10} y1={10}
                x2={size / 3 + 10} y2={size - size / 6 - 10}
                stroke={'white'}
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            pathLength: { duration, ease: 'linear' },
                            opacity: { duration: 0.01 },
                        }
                    }
                }}
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />

            <motion.line
                x1={size / 3 + 10} y1={10}
                x2={size - 10} y2={10}
                stroke={'white'}
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            pathLength: { duration, ease: 'linear' },
                            opacity: { duration: 0.01 },
                        }
                    }
                }}
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />

            <motion.line
                x1={size - 10} y1={10}
                x2={size - 10} y2={size - size / 6 - 10}
                stroke={'white'}
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            pathLength: { duration, ease: 'linear' },
                            opacity: { duration: 0.01 },
                        }
                    }
                }}
                style={{
                    strokeWidth: 10,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
        </motion.svg>
    )
}

function Game() {
    return (
        <Col className='h-100 d-flex flex-column justify-content-center align-items-center gap-3'>
            <MusicNote size={200} duration={5} />
            <ReplayButton />
            <BingoButton />
            <NextButton />
        </Col>
    )
}

export default Game