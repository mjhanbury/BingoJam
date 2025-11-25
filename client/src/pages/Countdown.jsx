import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleTheme, playNext, showControls } from "../store/slices/audioSlice";

function Countdown() {
    const { muted } = useSelector(s => s.audio);
    const dispatch = useDispatch();

    const boop = useRef();

    const [count, setCount] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(toggleTheme(false));
        dispatch(showControls(false));
    }, []);
    
    useEffect(() => {
        if (!count) {
            dispatch(playNext());
            navigate('/play');
        };

        const interval = setInterval(() => {
            setCount(i => i - 1);
            boop.current.currentTime = 0;
            boop.current.play();
        }, 1000);

        return () => clearInterval(interval);
    }, [count]);

    return (
        <Container className={'h-100 d-flex justify-content-center align-items-center fw-bold text-light'} style={{ fontSize: '6rem' }}>
            <motion.pre>{ count > 3 ? 'Ready' : (count ? count : 1) }</motion.pre>
            <audio ref={boop} src="./media/boop.mp3" muted={muted} />
        </Container>
    )
}

export default Countdown