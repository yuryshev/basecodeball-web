import GoogleAuthorizationButton from '../GoogleAuthorizationButton/GoogleAuthorizationButton'
import LeaderboardButton from '../LeaderboardButton/LeaderboardButton'
import Profile from '../Profile/Profile'
import LogoutButton from '../LogoutButton/LogoutButton'
import logo from './basketball.png'
import './Navbar.css'
import {
    Link
} from "react-router-dom"

export default function Navbar() {
    return(
        <div className="navbar-wrapper">
            <div className="navbar">
            <Link to='/'>
                <div className="logo-container">
                    
                    <img src={logo} alt="basketball"/>

                    
                    <div className="logo-text">
                        <h2>Basecodeball</h2>
                        <p>Вдосконалюй свій код та себе</p>
                    </div>
                    
                    
                </div>
                </Link>
                <div className='menu'>
                    <LeaderboardButton></LeaderboardButton>
                    <GoogleAuthorizationButton></GoogleAuthorizationButton>
                    <Profile></Profile>
                    <LogoutButton></LogoutButton>
                </div>
            </div>
        </div>
    )
}