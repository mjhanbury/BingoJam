import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Lobby from './pages/Lobby';

import { AnimatePresence, motion } from "motion/react"
import Curtain from './pages/Curtain';
import Game from './pages/Game';
import Controls from './pages/Controls';

function App() {
	return (
		<>
			<Game />
			<Controls />
		</>
	)
}

export default App
