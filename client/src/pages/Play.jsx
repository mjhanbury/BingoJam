import { motion } from 'motion/react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { showControls, togglePlay, toggleTheme } from '../store/slices/audioSlice';
import { useEffect } from 'react';

const SVG = () => {
    const { counter, duration } = useSelector(s => s.audio);
    const dispatch = useDispatch();
    const size = 400;

    useEffect(() => { dispatch(togglePlay(true)) }, [counter]);

    return (
        <motion.svg 
            key={`svg-${counter}`} 
            initial={'hidden'} 
            animate={'visible'} 
            onAnimationComplete={() => {
                dispatch(togglePlay(false));
                dispatch(showControls(true));
                dispatch(toggleTheme(true));
            }}
            height={size} 
            width={size} 
            style={{ marginBottom: 24 }}
        >
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
    return (
        <Container className='h-100 d-flex justify-content-center align-items-center'>
            <SVG />
        </Container>
    )
}

export default Play