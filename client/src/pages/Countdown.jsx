import { motion, animate, useMotionValue, useTransform } from "motion/react"
import { useContext, useEffect, useRef, useState } from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { ControlsContext } from "./Controls";

function Countdown() {
    const { muted, muteTheme, next } = useContext(ControlsContext);

    const boop = useRef();

    const [count, setCount] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        if (!count) {
            next();
            navigate('/play/5');
        };

        const interval = setInterval(() => {
            setCount(i => i - 1);
            boop.current.currentTime = 0;
            boop.current.play();
            muteTheme(true);
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