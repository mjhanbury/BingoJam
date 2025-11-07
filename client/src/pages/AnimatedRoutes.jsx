//#region Imports
// Router
import { Route, Routes, useLocation } from "react-router-dom"

// Components
import Lobby from "./Lobby"
import Game from "./Game"

// Motion
import { AnimatePresence } from "motion/react";
//#endregion Imports

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Lobby />} />
                <Route path='/game' element={<Game />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes