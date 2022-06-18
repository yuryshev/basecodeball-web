import Navbar from "../features/Navbar/Navbar.js"
import Description from "../features/Description/Description.js"

import {is_authorize, setWithExpiry, getWithExpiry} from '../scripts/authorization.js'

export default function Main(){

    const url = new URL(window.location.href)
    const url_access_token = url.searchParams.get('access_token')


    if(url_access_token != null){
        setWithExpiry('access_token', url_access_token, 60* 60 * 1000)
        window.location.replace('http://localhost:3000')
    }

    if(is_authorize()){
        if( getWithExpiry('user') == null){
            const access_token =  getWithExpiry('access_token')
            fetch('https://localhost:5001/getUser', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + access_token 
                }
            }).then((response) => {
                return response.json()
            }).then((data) => {
                setWithExpiry('user', JSON.stringify(data), 60 * 60 * 1000)
                window.location.replace('http://localhost:3000')
            })
        }
    }
        
    
    return(
        <div>
            <Navbar></Navbar>
            <Description></Description>
        </div>
    )
}