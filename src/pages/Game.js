import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../features/Navbar/Navbar.js'
import PlayerLobbyInfo from '../features/PlayerLobbyInfo/PlayerLobbyInfo.js'
import { HubConnectionBuilder } from '@microsoft/signalr'
import {getWithExpiry} from '../scripts/authorization.js'


import {UnControlled as CodeMirror} from 'react-codemirror2'
import {fromTextArea, setValue} from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'

import './Game.css'

import done from './done.png'
import close from './close.png'
import info from './info.png'

export default function Game() {

    const [connection, setConnection] = useState(null)
    const [group, setGroup] = useState(null)
    const [groupItems, setGroupItems] = useState(null)
    const [team1Codeblocks, setTeam1Codeblocks] = useState(null)
    const [team2Codeblocks, setTeam2Codeblocks] = useState(null)
    const [tests1, setTests1] = useState({img: info, text: 'Якщо готові, тисніть кнопку перевірки'})
    const [tests2, setTests2] = useState({img: info, text: 'Якщо готові, тисніть кнопку перевірки'})

    const codemirror_options = {mode: 'javascript', theme: 'dracula'}

    useEffect(() =>{
        const hub_connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7263/lobby")
        .build();

        setConnection(hub_connection)
    }, [])

    useEffect(()=>{
        if(connection){
            connection.start()
            .then(result => {
                
            })
            .catch(err => console.log('connection failed', err))

            connection.on('ReciveConnectionId', connection_id => {
                const user = JSON.parse(getWithExpiry('user'))
                const player = {id: user.userId, nickname: user.loginName, picture: user.picture, connectionId: connection_id}
                connection.invoke('Join', player)
            })
    
            connection.on('ReciveGroup', data => {
                setGroup(data)
            })
    
            connection.on('ReciveTask', task => {
                console.log(task)
            })

            
        }
    }, [connection])

    useEffect(()=>{
        if(group){
            const lobby_elemets = []
            let counter = 0
            for(let i = 0; i< group.teams.length; i++){
                for(let j = 0; j < group.teams[i].players.length; j++){
                    const element = group.teams[i].players[j]
                    lobby_elemets.push(<PlayerLobbyInfo key={counter} picture={element.picture} nickname={element.nickname}></PlayerLobbyInfo>)
                    counter++
                }
            }

            setGroupItems(lobby_elemets)


        }
    }, [group])

    useEffect(() => {
        if(groupItems){

            connection.on('ReceiveCodeblock', codeblock_data => {

                const codeblock = document.getElementById(codeblock_data.id)
                codeblock.querySelector('.CodeMirror').CodeMirror.setValue(codeblock_data.code)
            })

            if(groupItems.length == 4){
                document.getElementById('group-list').style.display = 'none'
                document.getElementsByClassName('codeflow')[0].style.display = 'flex'
                document.getElementsByClassName('task')[0].style.display = 'block'
                document.getElementsByClassName('tests-space')[0].style.display = 'flex'

                document.getElementById('task-title').innerText = group.task.title
                document.getElementById('task-description').innerText = group.task.description

            const team1codeblocks_elements = []
            const team2codeblocks_elements = []
            
            console.log(group)
            team1codeblocks_elements.push(<div id='codeblock_1_1' className='codeblock'><CodeMirror value={`// ${group.teams[0].players[0].nickname}, твої рядки непарні ♥`} options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_1', groupId: group.id, clientId: group.teams[0].players[0].id, code: value, connectionId: group.teams[0].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[0].nickname}</span><img className='codeblock-img' src={group.teams[0].players[0].picture}/></div></div>)
            
            team1codeblocks_elements.push(<div id='codeblock_1_2' className='codeblock'><CodeMirror value={`// ${group.teams[0].players[1].nickname}, твої рядки парні ♥`} options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_2', groupId: group.id, clientId: group.teams[0].players[1].id, code: value, connectionId: group.teams[0].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[1].nickname}</span><img className='codeblock-img' src={group.teams[0].players[1].picture}/></div></div>)

            team1codeblocks_elements.push(<div id='codeblock_1_3' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_3', groupId: group.id, clientId: group.teams[0].players[0].id, code: value, connectionId: group.teams[0].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[0].nickname}</span><img className='codeblock-img' src={group.teams[0].players[0].picture}/></div></div>)
            
            team1codeblocks_elements.push(<div id='codeblock_1_4' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_4', groupId: group.id, clientId: group.teams[0].players[1].id, code: value, connectionId: group.teams[0].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[1].nickname}</span><img className='codeblock-img' src={group.teams[0].players[1].picture}/></div></div>)

            team1codeblocks_elements.push(<div id='codeblock_1_5' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_5', groupId: group.id, clientId: group.teams[0].players[0].id, code: value, connectionId: group.teams[0].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[0].nickname}</span><img className='codeblock-img' src={group.teams[0].players[0].picture}/></div></div>)

            team1codeblocks_elements.push(<div id='codeblock_1_6' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_6', groupId: group.id, clientId: group.teams[0].players[1].id, code: value, connectionId: group.teams[0].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[1].nickname}</span><img className='codeblock-img' src={group.teams[0].players[1].picture}/></div></div>)

            team1codeblocks_elements.push(<div id='codeblock_1_7' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_7', groupId: group.id, clientId: group.teams[0].players[0].id, code: value, connectionId: group.teams[0].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[0].nickname}</span><img className='codeblock-img' src={group.teams[0].players[0].picture}/></div></div>)

            team1codeblocks_elements.push(<div id='codeblock_1_8' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_8', groupId: group.id, clientId: group.teams[0].players[1].id, code: value, connectionId: group.teams[0].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[1].nickname}</span><img className='codeblock-img' src={group.teams[0].players[1].picture}/></div></div>)

            team1codeblocks_elements.push(<div id='codeblock_1_9' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_9', groupId: group.id, clientId: group.teams[0].players[0].id, code: value, connectionId: group.teams[0].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[0].nickname}</span><img className='codeblock-img' src={group.teams[0].players[0].picture}/></div></div>)

            team1codeblocks_elements.push(<div id='codeblock_1_10' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[0].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_1_10', groupId: group.id, clientId: group.teams[0].players[1].id, code: value, connectionId: group.teams[0].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[0].players[1].nickname}</span><img className='codeblock-img' src={group.teams[0].players[1].picture}/></div></div>)

          
            
            // team2
            team2codeblocks_elements.push(<div id='codeblock_2_1' className='codeblock'><CodeMirror value={`// ${group.teams[1].players[0].nickname}, твої рядки непарні ♥`} options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_1', groupId: group.id, clientId: group.teams[1].players[0].id, code: value, connectionId: group.teams[1].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[0].nickname}</span><img className='codeblock-img' src={group.teams[1].players[0].picture}/></div></div>)
            
            team2codeblocks_elements.push(<div id='codeblock_2_2' className='codeblock'><CodeMirror value={`// ${group.teams[1].players[1].nickname}, твої рядки парні ♥`} options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_2', groupId: group.id, clientId: group.teams[1].players[1].id, code: value, connectionId: group.teams[1].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[1].nickname}</span><img className='codeblock-img' src={group.teams[1].players[1].picture}/></div></div>)

            team2codeblocks_elements.push(<div id='codeblock_2_3' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_3', groupId: group.id, clientId: group.teams[1].players[0].id, code: value, connectionId: group.teams[1].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[0].nickname}</span><img className='codeblock-img' src={group.teams[1].players[0].picture}/></div></div>)
            
            team2codeblocks_elements.push(<div id='codeblock_2_4' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_4', groupId: group.id, clientId: group.teams[1].players[1].id, code: value, connectionId: group.teams[1].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[1].nickname}</span><img className='codeblock-img' src={group.teams[1].players[1].picture}/></div></div>)

            team2codeblocks_elements.push(<div id='codeblock_2_5' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_5', groupId: group.id, clientId: group.teams[1].players[0].id, code: value, connectionId: group.teams[1].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[0].nickname}</span><img className='codeblock-img' src={group.teams[1].players[0].picture}/></div></div>)

            team2codeblocks_elements.push(<div id='codeblock_2_6' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_6', groupId: group.id, clientId: group.teams[1].players[1].id, code: value, connectionId: group.teams[1].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[1].nickname}</span><img className='codeblock-img' src={group.teams[1].players[1].picture}/></div></div>)

            team2codeblocks_elements.push(<div id='codeblock_2_7' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_7', groupId: group.id, clientId: group.teams[1].players[0].id, code: value, connectionId: group.teams[1].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[0].nickname}</span><img className='codeblock-img' src={group.teams[1].players[0].picture}/></div></div>)

            team2codeblocks_elements.push(<div id='codeblock_2_8' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_8', groupId: group.id, clientId: group.teams[1].players[1].id, code: value, connectionId: group.teams[1].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[1].nickname}</span><img className='codeblock-img' src={group.teams[1].players[1].picture}/></div></div>)

            team2codeblocks_elements.push(<div id='codeblock_2_9' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[0].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_9', groupId: group.id, clientId: group.teams[1].players[0].id, code: value, connectionId: group.teams[1].players[0].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[0].nickname}</span><img className='codeblock-img' src={group.teams[1].players[0].picture}/></div></div>)

            team2codeblocks_elements.push(<div id='codeblock_2_10' className='codeblock'><CodeMirror options={codemirror_options} 
            onChange={(editor, data, value) => {
                if(JSON.parse(getWithExpiry('user')).userId == group.teams[1].players[1].id){
                    connection.invoke('SendCodeblock', {id: 'codeblock_2_10', groupId: group.id, clientId: group.teams[1].players[1].id, code: value, connectionId: group.teams[1].players[1].connectionId})
                }
            }}></CodeMirror><div className='codeblock-info'><span className='codeblock-nickname'>{group.teams[1].players[1].nickname}</span><img className='codeblock-img' src={group.teams[1].players[1].picture}/></div></div>)

            setTeam1Codeblocks(team1codeblocks_elements)
            setTeam2Codeblocks(team2codeblocks_elements)
        }
           
        }
    }, [groupItems])

    function check_code(e){
        const user = JSON.parse(getWithExpiry('user'))
        let code = ''
        if(user.userId == group.teams[0].players[0].id || user.userId == group.teams[0].players[1].id){
            for(let i = 1; i <= 10; i++){
                const codeblock = document.getElementById('codeblock_1_' + i)
                code+=codeblock.querySelector('.CodeMirror').CodeMirror.getValue() + '\n'
            }
        }

        if(user.userId == group.teams[1].players[0].id || user.userId == group.teams[1].players[1].id){
            for(let i = 1; i <= 10; i++){
                const codeblock = document.getElementById('codeblock_2_' + i)
                code+=codeblock.querySelector('.CodeMirror').CodeMirror.getValue() + '\n'
            }
        }

        let test_counter = 0
        for(let i = 0; i < group.task.tests.length; i++){
            try {
                let actual_result =  eval(code + ' ' + group.task.tests[i].inputData); 
                if(group.task.tests[i].expectedResult == actual_result){
                    test_counter++
                }
            } catch (e) {
                if (e instanceof SyntaxError) {
                    alert(e.message);
                    break
                }
            }
        }

        console.log(test_counter)

        if(user.userId == group.teams[0].players[0].id || user.userId == group.teams[0].players[1].id){
            if(test_counter == group.task.tests.length){
                console.log('path')
                setTests1({img: done, text: 'Вітаємо, всі тести пройдено'})
            }
            else{
                console.log('fail')
                setTests1({img: close, text: 'Нажаль, не всі тести пройдено'})
            }
        }
        
        if(user.userId == group.teams[1].players[0].id || user.userId == group.teams[1].players[1].id){
            if(test_counter == group.task.tests.length){
                console.log('path')
                setTests2({img: done, text: 'Вітаємо, всі тести пройдено'})
            }
            else{
                console.log('fail')
                setTests2({img: close, text: 'Нажаль, не всі тести пройдено'})
            }
        }   

        
    }

    return(
        <div>
            <Navbar></Navbar>
            <div id='group-list'>
                <h2>шукаемо гравців зачекайте!</h2>
                <div className='dot-container'>
                    <div className='dot dot1'></div>
                    <div className='dot dot2'></div>
                    <div className='dot dot3'></div>
                </div>
                    {groupItems}
            </div>
            <div className='task' style={{display: 'none'}}>
                    <p id='task-title'></p>
                    <p id='task-description'></p>
                </div>
            <div className='codeflow' style={{display: 'none'}}>
            <div className='code-space'>
                {team1Codeblocks}
            </div>
            <div className='code-space'>
                {team2Codeblocks}
            </div>
            </div>
            <div className='tests-space' style={{display: 'none'}}>
                <div id='test-block-1'>
                    <img src={tests1.img}/>
                    <span>{tests1.text}</span>
                </div>
                <button onClick={check_code}>перевірити</button>
                <div id='test-block-2'>
                    <img src={tests2.img}/>
                    <span>{tests2.text}</span>
                </div>
            </div>
            
        </div>
    )
}
