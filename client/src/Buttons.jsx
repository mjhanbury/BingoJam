// Redux
import { useSelector, useDispatch } from 'react-redux'
import { replay, toggleMute, togglePlay, toggleSummary, toggleTheme } from './store/slices/audioSlice'

// Motion
import { motion, useAnimate } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft, faBell, faForward, faPlay, faStop, faTimesRectangle, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCurtain } from './pages/Curtain';
import { useRef } from 'react';

const asset = (path) => import.meta.env.BASE_URL + path;

const MuteButton = () => {
    const muted = useSelector(s => s.audio.muted);
    const dispatch = useDispatch();
    const [scope, animate] = useAnimate();

    return (
        <motion.button 
            ref={scope}
            className={'bg-transparent border-0'}
            onMouseOver={() => animate('svg', { scale: 0.9 })}
            onMouseOut={() => animate('svg', { scale: 1.0 })}
            onClick={() => {
                animate('svg', { scale: 1.1 }, { onComplete: () => animate('svg', { scale: 0.9 }) });
                dispatch(toggleMute());
            }}
        >
            <FontAwesomeIcon 
                icon={ muted ? faVolumeMute : faVolumeHigh }
                className={'fs-1 text-light'}
            />
            <p className={'text-light m-0 mt-2'}>Mute</p>
        </motion.button>
    )
}

const QuitButton = () => {
    const [scope, animate] = useAnimate();
    const { navigateWithCurtain } = useCurtain();

    return (
        <motion.button 
            ref={scope}
            className={'bg-transparent border-0'}
            onMouseOver={() => animate('svg', { scale: 0.9 })}
            onMouseOut={() => animate('svg', { scale: 1.0 })}
            onClick={() => {
                animate('svg', { scale: 1.1 }, { onComplete: () => animate('svg', { scale: 0.9 }) });
                navigateWithCurtain('/');
            }}
        >
            <FontAwesomeIcon 
                icon={faTimesRectangle}
                className={'fs-1 text-light'}
            />
            <p className={'text-light m-0 mt-2'}>Quit</p>
        </motion.button>
    )
}

const ReplayButton = () => {
    const [scope, animate] = useAnimate();
    const { current, playing } = useSelector(s => s.audio);
    const dispatch = useDispatch();

    return (
        <motion.button 
            ref={scope}
            className={'bg-transparent border-0'}
            initial={{ y: 200 }}
            onMouseOver={() => animate('svg', { scale: 0.9, rotate: -360 })}
            onMouseOut={() => animate('svg', { scale: 1.0, rotate: 0 })}
            onClick={() => {
                animate('svg', { scale: 1.1 }, { onComplete: () => animate('svg', { scale: 0.9, rotate: -360 }) });
                if (playing) dispatch(togglePlay(false));
                dispatch(toggleTheme(false));
                dispatch(replay());
            }}
        >
            <FontAwesomeIcon 
                icon={faArrowRotateLeft}
                className={'fs-1 text-light'}
            />
            <p className={'text-light m-0 mt-2'}>Replay</p>
        </motion.button>
    )
}

const PlayPauseButton = () => {
    const { playing } = useSelector(s => s.audio);
    const dispatch = useDispatch();
    const [scope, animate] = useAnimate();

    return (
        <motion.button 
            ref={scope}
            className={'bg-transparent border-0'}
            initial={{ y: 200 }}
            onMouseOver={() => animate('svg', { scale: 0.9 })}
            onMouseOut={() => animate('svg', { scale: 1.0 })}
            onClick={() => {
                animate('svg', { scale: 1.1 }, { onComplete: () => animate('svg', { scale: 0.9 }) });
                dispatch(toggleTheme(playing))
                dispatch(togglePlay(!playing));
            }}
        >
            <FontAwesomeIcon 
                icon={playing ? faStop : faPlay}
                className={'fs-1 text-light'}
            />
            <p className={'text-light m-0 mt-2'}>{ playing ? 'Stop' : 'Play' }</p>
        </motion.button>
    )
}

const BingoButton = () => {
    const bellRef = useRef();
    const [scope, animate] = useAnimate();
    const { muted, playing } = useSelector(s => s.audio);
    const dispatch = useDispatch();

    return (
        <motion.button 
            ref={scope}
            className={'bg-transparent border-0'}
            initial={{ y: 200 }}
            onMouseOver={() => animate('svg', { rotate: [0,-15,15,0] })}
            onMouseOut={() => animate('svg', { rotate: 0 })}
            onClick={() => {
                animate('svg', { scale: 1.1, rotate: [0,-15,15,-15,15,-15,15,-15,15,0] }, { 
                    onComplete: () => {
                        animate('svg', { scale: 1.0 });
                        dispatch(toggleSummary(true));
                    }
                });
                if (playing) {
                    dispatch(togglePlay(false));
                    dispatch(toggleTheme(true));
                }
                if (bellRef.current) {
                    bellRef.current.currentTime = 0;
                    bellRef.current.play();

                }
            }}
        >
            <FontAwesomeIcon 
                icon={faBell}
                className={'fs-1 text-light'}
            />
            <p className={'text-light m-0 mt-2'}>Bingo</p>
            <audio ref={bellRef} src={asset('media/Bell.mp3')} muted={muted} />
        </motion.button>
    )
}

const NextButton = () => {
    const [scope, animate] = useAnimate();
    const { navigateWithCurtain } = useCurtain();
    const { played, all, playing } = useSelector(s => s.audio);
    const dispatch = useDispatch();

    return (
        <motion.button 
            ref={scope}
            className={'bg-transparent border-0'}
            initial={{ y: 200 }}
            onMouseOver={() => animate('svg', { scale: 0.9 })}
            onMouseOut={() => animate('svg', { scale: 1.0 })}
            onClick={() => {
                animate('svg', { scale: 1.1 }, { onComplete: () => animate('svg', { scale: 0.9 }) });
                if (playing) dispatch(togglePlay(false));
                navigateWithCurtain('/countdown');
            }}
            disabled={played.length === all.length}
            style={ played.length === all.length ? { opacity: 0.5 } : { opacity: 1.0 }}

        >
            <FontAwesomeIcon 
                icon={faForward}
                className={'fs-1 text-light'}
            />
            <p className={'text-light m-0 mt-2'}>Next</p>
        </motion.button>
    )
}

export { MuteButton, QuitButton, ReplayButton, PlayPauseButton, BingoButton, NextButton }