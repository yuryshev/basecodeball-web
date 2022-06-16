import icon from './leaderboard.png'
import './LeaderboardButton.css'

export default function LeaderboardButton() {
    return(
        <button onClick={()=>window.location.replace('http://localhost:3000/leaderboard')} className='leaderboard-btn'>
            <span>Таблиця найкращих гравців</span>
            <img src={icon} alt='leaderboard-icon'/>
        </button>
    )
}