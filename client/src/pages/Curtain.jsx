import { createContext, useCallback, useContext, useRef } from 'react'
import { delay, easeInOut, motion, useAnimate } from 'motion/react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const asset = (path) => import.meta.env.BASE_URL + path;

export const CurtainContext = createContext(null);
export const Curtain = ({ children }) => {
	const muted = useSelector(s => s.audio.muted);
	const whoosh = useRef();

	const [scope, animate] = useAnimate();
	const navigate = useNavigate();

	const navigateWithCurtain = useCallback((route) => {
		animate('#leftCurtain', { x: 0 }, { 
			duration: 0.5, 
			ease: easeInOut,
			onPlay: () => {
				if (whoosh.current) {
					whoosh.current.currentTime = 0;
					whoosh.current.play();
				}
			},
			onComplete: () => {
				navigate(route);
				delay(() => {
					animate('#leftCurtain', { x: -window.innerWidth / 2 }, { 
						duration: 0.5,
						ease: easeInOut,
						onPlay: () => {
							if (whoosh.current) {
								whoosh.current.currentTime = 0;
								whoosh.current.play();
							}
						} 
					});
					animate('#rightCurtain', { x: window.innerWidth }, { duration: 0.5, ease: easeInOut });
				}, 500);
			}
		});
		animate('#rightCurtain', { x: window.innerWidth / 2 }, { duration: 0.5, ease: easeInOut });
	}, []);

	return (  
		<CurtainContext.Provider value={{ navigateWithCurtain }}>			
			<div ref={scope} className='position-relative h-100 w-100 overflow-hidden'>
				<motion.div
					id={'leftCurtain'}
					className="position-absolute top-0 left-0 h-100 w-50 bg-danger"
					style={{
						x: -window.innerWidth / 2,
						borderRight: '8px yellow solid',
						background: 'repeating-linear-gradient(to left, hsl(0, 100%, 25%), hsl(0, 100%, 25%) 40px, hsl(0, 90%, 30%) 40px, hsl(0, 90%, 30%) 80px)',
						zIndex: 1000
					}}
					/>
					{ children }
				<motion.div
					id={'rightCurtain'}
					className="position-absolute top-0 right-0 h-100 w-50"
					style={{
						x: window.innerWidth,
						borderLeft: '8px yellow solid',
						background: 'repeating-linear-gradient(to right, hsl(0, 100%, 25%), hsl(0, 100%, 25%) 40px, hsl(0, 90%, 30%) 40px, hsl(0, 90%, 30%) 80px)'
					}}
					/>
				<audio ref={whoosh} src={asset('media/Whoosh.mp3')} muted={muted} />
			</div>
		</CurtainContext.Provider>
	)
}
export const useCurtain = () => useContext(CurtainContext);