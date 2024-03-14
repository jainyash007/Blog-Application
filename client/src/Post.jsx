import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'  // eslint-disable-line no-unused-vars
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from './App'

function Post() {
    //useParams is use to fetch the id from URL
    const {id} = useParams()
    //to store the result useState hook
    const [post, setPost] = useState({})

    const navigate = useNavigate()
    
    //useContext is udes to navigate between the login/register to logout upon below condition
    const user = useContext(userContext)

    //fetch the records using id through useEffect hook
    useEffect(() => {
        axios.get('http://localhost:3001/getpostbyid/'+id)
        .then(result=> setPost(result.data))
        .catch(err => console.log(err))
    }, [])

     //deletion of post by id
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deletepost/'+id)
        .then(res => {
          if(res.data === "Success") {
            navigate('/')
          }
        }
      ) 
        .catch(err => console.log(err))
    }

  return (
    <div className='post_container'>
        <div className='post_post'>
            <img src={`http://localhost:3001/Images/${post.file}`} alt="" />
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <div>
              {
                user.email === post.email ?
                <>
                  <Link to={`/editpost/${post._id}`}>EDIT</Link>
                  <button onClick={() => handleDelete(post._id)}>DELETE</button>
                </>:
                <></>
              }
            </div>
            </div>
        </div>        
  )
}

export default Post