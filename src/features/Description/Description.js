import './Description.css'
import 'animate.css'
import {is_authorize} from '../../scripts/authorization.js'

export default function Description(){
    function handle_click(e){
        e.preventDefault()
        if(is_authorize()){
            window.location.replace('http://localhost:3000/game')
        }else{
            window.location.replace('https://localhost:7284/api/google/authorization/code')
        }
    }
    return(
        <div className="description-container"> 
            <h1 className='animate__animated animate__pulse animate__infinite'>Basecodeball</h1>
            <p>Вільний безкоштовний додаток для вдосконалення своїх знань і себе у командному програмуванні в ігровій формі, долучайтесь:)</p>
            <button onClick={handle_click}>Починай саме зараз!</button>
        </div>
    )
}