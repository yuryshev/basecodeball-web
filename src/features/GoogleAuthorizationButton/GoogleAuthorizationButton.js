import icon from './google.png'
import './GoogleAuthorizationButton.css'
import {is_authorize} from '../../scripts/authorization.js'

export default function GoogleAuthorizationButton() {

    let display = ''

    function handle_click(e) {
        e.preventDefault()
        window.location.replace('https://localhost:7284/api/google/authorization/code')
    }

    if(is_authorize()){
        display = 'none'
    }
    else{
        display = 'inline-block'
    }
    
    return (
        <button style={{display: display}} onClick={handle_click} className='google-btn'>
            <span>Увійти</span>
            <img src={icon} alt='google-icon'/>
        </button>
    )
}