import React, { useState } from 'react' // eslint-disable-line no-unused-vars
import './style.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
//useNavigate -> navigate directly from register to login page 


function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    //const navigate = useNavigate(); //useNavigate -> navigate directly from register to login page 
    axios.defaults.withCredentials = true;

    //prevent default submission
    //store data enetering in the username, email etc using global variable(username, setUsername...)
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
        .then(res => {
            if(res.data === "Success") {
                window.location.href = "/"
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='signup_container'>
        <div className='signup_form'>
            <h1>LOGIN</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label> <br />
                    <input type="email" placeholder='Enter your email'
                    onChange={e => setEmail(e.target.value)}/>
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder='Enter your password'
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className='signup_btn'>LOGIN</button>
            </form>
            <br />
            <p>If not registered...</p>
            <Link to='/register'>
                <button className='signup_btn'>SIGN UP</button>
            </Link>
        </div>
     </div>
  )
}

export default Login