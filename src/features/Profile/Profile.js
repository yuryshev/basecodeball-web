import {is_authorize, getWithExpiry} from '../../scripts/authorization.js'
import './Profile.css'

export default function Profile() {

    let display = ''
    let nickname = ''
    let picture = ''
    if(!is_authorize()){
        display = 'none'
    }
    else{
        display = 'inline-block'
        nickname = JSON.parse(getWithExpiry('user')).loginName
        picture = JSON.parse(getWithExpiry('user')).picture
    }

    return (
        <div style={{display: display}} className='profile-block'>
            <span>{nickname}</span>
            <img src={picture} alt='account-picture'/>
        </div>
    )
}