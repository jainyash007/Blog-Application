import React, { useEffect, useState } from 'react' // eslint-disable-line no-unused-vars
import axios from 'axios'
import  { Link } from 'react-router-dom'

function Home() {

  //to display data on frontend we use state variable
  const [posts, setPosts] = useState([])

  //to fetch the records
  useEffect(() => {
    axios.get('http://localhost:3001/getposts')
    .then(posts => {
      setPosts(posts.data)
    })
    .catch(err => console.log(err))
  }, [])
  return (
    //_id beacause in db id field is stored with _id
    <div className='post_container'>
      {
          posts.map(post => (
            <> 
              <Link to={`/post/${post._id}`} className='post'> 
                  <img src={`http://localhost:3001/Images/${post.file}`} alt='' />
                  <div className='post_text'>
                      <h2>{post.title}</h2>
                      <p>{post.description}</p>
                  </div>
              </Link>
            </>
          ))
      }
    </div>
  )
}

export default Home