//#region Imports
// Router
import { Route, Routes, useLocation } from "react-router-dom"

// Components
import Lobby from "./Lobby"
import Game from "./Game"

// Motion
import { AnimatePresence } from "motion/react";
import Countdown from "./Countdown";
import Play from "./Play";
import Summary from "./Summary";
//#endregion Imports

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Lobby />} />
                <Route path='/countdown' element={<Countdown />} />
                <Route path='/play/:duration' element={<Play />} />
                <Route path='/summary' element={<Summary />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes