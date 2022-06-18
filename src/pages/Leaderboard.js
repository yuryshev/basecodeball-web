import Navbar from "../features/Navbar/Navbar.js"
import "./Leaderboard.css"
import 'animate.css'
import React, { useState, useEffect } from 'react'

export default function Leaderboard(){

    const [users, setState] = useState([])

    useEffect(()=>{
        if(users.length == 0){
            fetch('https://localhost:5001/getUserRating', {
            method: 'GET'
        }).then((response)=>{
            return response.json()
        }).then(data => {
            console.log(data)
            setState(data)
            console.log(users)
        })
        }
    })


    return (
        <div>
            <Navbar></Navbar>
            <div id="leaderboard">
                {users.map((user, i)=>
                <div className="leaderboard-block animate__animated animate__bounceInDown">
                    <span className="number-text">{i+1}</span>
                    <div className="user-block">
                    <img src={user.picture} referrerPolicy='no-referrer'/>
                    <span className="nickname-text">{user.nickName}</span>
                    </div>
                    <span className="rating-text">{user.rating}</span>
                </div>
                )}
            </div>
        </div>
    )
}