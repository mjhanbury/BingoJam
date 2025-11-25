import { AnimatePresence } from "motion/react";
import { useDispatch, useSelector } from "react-redux"
import { motion } from 'framer-motion'
import { previewSong, toggleSummary, toggleTheme } from "../store/slices/audioSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlayCircle, faStopCircle, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={'w-50 bg-transparent p-0 text-light'}
            style={{
                maxWidth: '600px'
            }}
        >
            <Row>
                <Col md={10} className={'d-flex justify-content-start align-items-center fs-5'}>
                    Played Songs
                </Col>
                <Col md={2} className={'d-flex justify-content-end align-items-center fs-2'}>
                    <button 
                        className={'border-0 bg-transparent p-0 text-light'}
                        onClick={() => {
                            dispatch(toggleTheme(true));
                            dispatch(toggleSummary(false));
                        }}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </Col>
            </Row>
        </motion.div>
    )
}

const Card = ({ song, delay, order }) => {
    const { muted, preview } = useSelector(s => s.audio);
    const songRef = useRef();
    const [playing, play] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (preview !== song.title) {
            play(false);
        }
    }, [preview]);

    useEffect(() => {
        if (!songRef.current) return;

        if (playing) {
            songRef.current.currentTime = 0;
            songRef.current.play();
        }
        else {
            songRef.current.pause();
        }
    }, [playing])

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay }}
            className={'w-50 bg-light rounded p-4'}
            style={{
                maxWidth: '600px'
            }}
        >
            <Row>
                <Col md={2} className={'d-flex justify-content-center align-items-center'} style={{ color: 'hsl(0,0%,50%)' }}>
                    {order}
                </Col>
                <Col md={8}>
                    <Row>{song.title}</Row>
                    <Row style={{ color: 'hsl(0,0%,50%)' }}>{song.artist}</Row>
                </Col>
                <Col md={2} className={'d-flex justify-content-center align-items-center fs-2'}>
                    <button 
                        className={'border-0 bg-transparent p-0'}
                        onClick={() => {
                            if (playing) {
                                dispatch(previewSong(null));
                                dispatch(toggleTheme(true));
                            }
                            else {
                                dispatch(previewSong(song.title));
                                dispatch(toggleTheme(false));
                            }
                            play(p => !p);
                        }}
                    >
                        <FontAwesomeIcon icon={playing ? faStopCircle : faPlayCircle} />
                    </button>
                </Col>
                <audio ref={songRef} src={song.path} muted={muted} loop />
            </Row>
        </motion.div>
    )
}

function Summary() {
    const { summaryVisible, played } = useSelector(s => s.audio);
    const dispatch = useDispatch();

    return (
        <AnimatePresence initial={false}>
            {summaryVisible ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        height: window.innerHeight,
                        width: window.innerWidth,
                        top: 0,
                        left: 0,
                        background: 'hsla(0,0%,0%,50%)',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >
                    <Header />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '1rem',
                        maxHeight: '50vh',
                        width: '100vw',
                        overflow: 'auto'
                    }}>
                        {
                            played.map((song, i) => (
                                <Card key={`song-card-${i}`} song={song} delay={i/25} order={i+1} />
                            ))
                        }
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}

export default Summary