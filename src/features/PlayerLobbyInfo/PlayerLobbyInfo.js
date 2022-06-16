import './PlayerLobbyInfo.css'

export default function PlayerLobbyInfo(props){
    return(
        <div className='group-element'>
            <img src={props.picture}/>
            <div>
                <p className="nickname">{props.nickname}</p>
                <p className="text">Приєднався до групи!</p>
            </div>
        </div>
    )
}