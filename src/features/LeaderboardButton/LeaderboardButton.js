import icon from './leaderboard.png'
import './LeaderboardButton.css'

export default function LeaderboardButton() {
    return(
        <button className='leaderboard-btn'>
            <span>Таблиця найкращих гравців</span>
            <img src={icon} alt='leaderboard-icon'/>
        </button>
    )
}