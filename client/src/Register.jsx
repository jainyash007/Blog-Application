import React, { useState } from 'react' // eslint-disable-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
//useNavigate -> navigate directly from register to login page 
 
 function Register() {

    //global variables
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate(); //useNavigate -> navigate directly from register to login page 

    const handleSubmit = (e) => {
        //prevent default submission
        e.preventDefault()
        //store data enetering in the username, email etc using global variable(username, setUsername...)
        axios.post('http://localhost:3001/register', {username, email, password})
        .then(navigate('/login'))
        .catch(err => console.log(err))
    }

   return (
     <div className='signup_container'>
        <div className='signup_form'>
            <h1>SIGN UP</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Username:</label> <br />
                    <input type="name" placeholder='Enter your username' 
                    onChange={e => setUsername(e.target.value)}/>
                </div>
                <br />
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
                <button className='signup_btn'>SIGN UP</button>
            </form>
            <br />
            <p>Already have an account...</p>
            <Link to='/login'>
                <button className='signup_btn'>LOGIN</button>
            </Link>
        </div>
     </div>
   )
 }
 
 export default Register