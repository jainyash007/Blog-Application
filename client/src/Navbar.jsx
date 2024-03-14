import React, { useContext } from 'react' // eslint-disable-line no-unused-vars
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './App'
import axios from 'axios'

function Navbar() {

  //useContext is udes to navigate between the login/register to logout upon below condition
  const user = useContext(userContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout')
    .then(res => {
      if(res.data === "Success")
        navigate(0) //refresh the same page when logout
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='navbar-header'>
        <div><h2>BLOG APPLICATION</h2></div>
        <div>
            <Link to='/' className='link'>Home</Link>
            { //if user is logged in then only it will show the create post link else empty
              user.username ?
                <Link to='/create' className='link'>Create Post</Link> 
              : 
              <></>
            }
            <Link href="" className='link'>Contact</Link>
        </div>
        {
            user.username ?
            <div>
                <input type="button" onClick={handleLogout} value="LOGOUT" className='btn_input'/>
            </div>
              :
            <div><h4><Link to="/register" className="link">REGISTER / LOGIN</Link></h4></div>
        }
    </div>
  )
}

export default Navbar