import { useContext, useEffect, useRef, useState } from 'react'
import { ControlsContext } from './Controls'
import { motion } from 'motion/react'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

const NoteSVG = ({ size, duration }) => {
    return (
        <motion.svg initial={'hidden'} animate={'visible'} exit={{ opacity: 0 }} height={size} width={size} style={{ marginBottom: 24 }}>
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

function Play() {
    const navigate = useNavigate();
    const { duration } = useParams();
    const size = 400;

    const { muted, muteTheme, history } = useContext(ControlsContext);
    const controls = useRef();

    useEffect(() => {
        if (!controls.current) return;

        muteTheme(true);
        controls.current.currentTime = 0;
        controls.current.play();

        const interval = setInterval(() => {
            controls.current.pause();
            navigate('/summary');
        }, duration * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container className='h-100 d-flex justify-content-center align-items-center'>
            <NoteSVG size={size} duration={duration} />
            <audio 
                ref={controls} 
                src={`/media/songs/${history[history.length - 1].title.replace(/\s/g, '')}.mp3`} 
                muted={muted} 
            />
        </Container>
    )
}

export default Play