import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Main from "./pages/Main.js"
import Registration from "./pages/Registration.js"
import Game from "./pages/Game.js"
import Leaderboard from "./pages/Leaderboard.js"


export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main></Main>}/>
        <Route path="/registration" element={<Registration></Registration>}/>
        <Route path="/leaderboard" element={<Leaderboard></Leaderboard>}/>
        <Route path="/game" element={<Game></Game>}/>
      </Routes>
    </Router>
  )
}
