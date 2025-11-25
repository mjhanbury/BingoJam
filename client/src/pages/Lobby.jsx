//#region Imports
// React
import { Fragment, useEffect, useRef } from 'react'

// Styles
import { Row, Col } from 'react-bootstrap';

// Confetti
import { useReward } from 'react-rewards';

// Motion
import { motion } from 'framer-motion'

// Components
import { useCurtain } from './Curtain';
import { useDispatch, useSelector } from 'react-redux';
import { reset, showControls, toggleTheme } from '../store/slices/audioSlice';
//#endregion Imports

const Title = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: 'white' }}>
			<h1 style={{ fontSize: '9rem', fontWeight: 'bold' }}>
				Bingo
			</h1>
			<motion.h1
				initial={{ fontSize: '9rem', rotate: 5 }}
				animate={{ fontSize: '10rem', rotate: -5 }}
				transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
				style={{ WebkitTextStroke: '0.25rem white', fontWeight: 'bold', color: 'transparent' }}
			>
				Jam!
			</motion.h1>
		</div>
	)
}

const PlayButton = () => {
	const muted = useSelector(s => s.audio.muted);
	const dispatch = useDispatch();

	const { reward, isAnimating } = useReward('rewardId', 'confetti');
    const confetti = useRef(null);

	const { navigateWithCurtain } = useCurtain();

	useEffect(() => { 
		dispatch(reset());
		dispatch(showControls(false));
		dispatch(toggleTheme(true));
	}, []);

	const play = (e) => {
		e.preventDefault();

		if (confetti.current) {
			confetti.current.currentTime = 0;
			confetti.current.play();
			confetti.current.onended = () => {
				navigateWithCurtain('/countdown');
			};
		}
		reward();
	};

    return (
		<Fragment>
			<motion.button
				whileHover={{ scale: 1.2, rotate: 0 }}
				whileTap={{ scale: 0.8, rotate: 20 }}
				style={{
					width: 200,
					height: 100,
					backgroundColor: 'white',
					borderRadius: 5,
					border: 'none',
					fontSize: '2rem',
					fontWeight: 'bold',
				}}
				disabled={isAnimating}
				onClick={play}
			>
				<span id="rewardId" />
				Play
			</motion.button>
			<audio ref={confetti} src="./media/Confetti.mp3" muted={muted} />
		</Fragment>
    )
}

function Lobby() {
	return (
		<Col className='h-100 d-flex flex-column justify-content-center align-items-center'>
			<Row className={'h-25 justify-content-center align-items-center'}>
				<Title />
			</Row>
			<Row className={'h-25 justify-content-center align-items-center'}>
				<PlayButton />
			</Row>
		</Col>
	)
}

export default Lobby
