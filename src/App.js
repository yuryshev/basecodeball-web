import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Main from "./pages/Main.js"
import Registration from "./pages/Registration.js"
import Game from "./pages/Game.js"


export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main></Main>}/>
        <Route path="/registration" element={<Registration></Registration>}/>
        <Route path="/leaderboard" element={<h1>Leaderboard Page</h1>}/>
        <Route path="/game" element={<Game></Game>}/>
      </Routes>
    </Router>
  )
}
