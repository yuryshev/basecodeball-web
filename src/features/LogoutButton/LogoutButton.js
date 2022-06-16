import './LogoutButton.css'
import icon from './logout.png'
import {is_authorize} from '../../scripts/authorization.js'

export default function LogoutButton() {

    let display = ''

    function handle_click(e) {
        e.preventDefault()
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        window.location.replace('http://localhost:3000')
        
    }

    if(!is_authorize()){
        display = 'none'
    }
    else{
        display = 'inline-block'
    }
    return(
        <button style={{display: display}} onClick={handle_click} className='logout-btn'>
            <span>Вийти</span>
            <img src={icon} alt='logout-icon'/>
        </button>
    )
}