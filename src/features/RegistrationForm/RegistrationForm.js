import './RegistrationForm.css'

export default function RegistrationForm(){

    function handle_click(e) {
        e.preventDefault()
        const url = new URL(window.location.href)
        const email = url.searchParams.get('email')
        const picture = url.searchParams.get('picture')

        const nickname = document.getElementById('nickname').value
        console.log(nickname, email, picture)
        
        fetch(`https://localhost:5001/reg?email=${email}&loginName=${nickname}&picture=${picture}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email, "loginName": nickname })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            window.location.replace(`http://localhost:3000?access_token=${data.access_token}`)
        })
    }

    return(
        <form className="registration-from"> 
            <h1>Ви тут впрше нумо реєструватися!</h1>
            <input id='nickname' type='text'></input>
            <button onClick={handle_click}>Підтвердити!</button>
        </form>
    )
}