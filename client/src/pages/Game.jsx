//#region Imports
// React
import { Fragment, useContext, useEffect, useRef, useState } from "react";

// Motion
import { motion } from 'framer-motion'

// Styles
import { Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faForward, faRepeat } from "@fortawesome/free-solid-svg-icons";

// Components
import { ControlsContext } from "./Controls";
//#endregion Imports

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

const ReplayButton = ({ play }) => {
    return (
        <>
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: {
                    duration: 0.5,
                }}}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.9, rotate: 5 }}
                style={button}
                onClick={() => { play(true) }}
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

const AudioProgress = ({ size, duration, reset }) => {
    return (
        <motion.svg key={reset} initial={'hidden'} animate={'visible'} height={size} width={size} style={{ marginBottom: 24 }}>
            <motion.circle
                cx={size / 6 + 20} cy={size - size / 6 - 20} r={size / 6}
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
                    strokeWidth: 20,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <motion.circle
                cx={size - size / 6 - 20} cy={size - size / 6 - 20} r={size / 6}
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
                    strokeWidth: 20,
                    strokeLinecap: "round",
                    fill: "transparent",
                    scaleY: -1,
                    transformOrigin: 'center'
                }}
            />
            <motion.line
                x1={size / 3 + 20} y1={20}
                x2={size / 3 + 20} y2={size - size / 6 - 20}
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
                    strokeWidth: 20,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <motion.line
                x1={size / 3 + 20} y1={20}
                x2={size - 20} y2={20}
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
                    strokeWidth: 20,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />

            <motion.line
                x1={size - 20} y1={20}
                x2={size - 20} y2={size - size / 6 - 20}
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
                    strokeWidth: 20,
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
            <AudioProgress size={300} duration={5} />
            {
                !playing && (
                    <Fragment>
                        <ReplayButton play={play} />
                        <BingoButton />
                        <NextButton />
                    </Fragment>
                )
            }
            <audio ref={song} src="./media/songs/Frosty.mp3" muted={muted} />
        </Col>
    )
}

export default Game