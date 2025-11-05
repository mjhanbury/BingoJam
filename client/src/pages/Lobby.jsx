import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import { useReward } from 'react-rewards';

import { motion } from 'framer-motion'



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
				style={{ animation: 'color-fade 5s infinite alternate', WebkitTextStroke: '0.25rem white', fontWeight: 'bold' }}
			>
				Jam!
			</motion.h1>
		</div>
	)
}

const PlayButton = ({ muted }) => {
    const { reward, isAnimating } = useReward('rewardId', 'confetti');

    const confetti = useRef(null);

    const play = () => {
		if (confetti.current) {
			confetti.current.currentTime = 0;
			confetti.current.play();
		}
		reward();
	};

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.2, rotate: 0 }}
                whileTap={{ scale: 0.8, rotate: 10 }}
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
        </>
    )
}

function Lobby() {
	const [muted, mute] = useState(true);
	
	return (
		<Container className='h-100'>
			<Col className='h-100'>
				<Row style={{ height: '50%', justifyContent: 'center', alignItems: 'center' }}>
					<Title />
				</Row>
				<Row style={{ height: '50%', justifyContent: 'center', alignItems: 'start' }}>
					<PlayButton muted={muted} />
				</Row>
			</Col>
		</Container>
	)
}

export default Lobby
