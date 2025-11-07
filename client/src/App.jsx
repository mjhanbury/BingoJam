//#region Imports
// Styles
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'

// Motion
import { motion } from "motion/react"

// Router
import { BrowserRouter as Router } from 'react-router-dom'

// Components
import AnimatedRoutes from './pages/AnimatedRoutes'
import Controls from './pages/Controls'
//#endregion Imports

const Background = ({ children }) => {
	const colors = [
		'hsl(46, 47%, 24%)',
		'hsl(38, 76%, 69%)',
		'hsl(28, 83%, 65%)',
		'hsl(19, 88%, 62%)',
		'hsl(14, 63%, 28%)'
	];

	return (
		<Container className='h-100 mw-100 m-0 p-0'>
			<motion.div
				initial={{ backgroundColor: colors[0] }}
				animate={{ backgroundColor: colors }}
				transition={{ duration: 30, repeat: Infinity, repeatType: 'mirror' }}
				className={'h-100 w-100'}
			>
				{ children }
			</motion.div>
		</Container>
	)
}

function App() { 
	return (
		<Background>
			<Controls>
				<Router>
					<AnimatedRoutes />
				</Router>
			</Controls>
		</Background>
	) 
}

export default App