import axios from 'axios';
import React, { useEffect, useState } from 'react' // eslint-disable-line no-unused-vars
import { useNavigate, useParams } from 'react-router';


//to store the values from frontend we will be using state variables
function EditPost() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const navigate = useNavigate()

    //useParams is use to fetch the id from URL
    const {id} = useParams()

    const handleSubmit = (e) => {
        //prevent default submission
        e.preventDefault;
        axios.put('http://localhost:3001/editpost/'+id, {title, description})
        .then(res => {
            if(res.data === "Success") {
                navigate('/')
            }
        })
        .catch(err => console.log(err));
    }

  //fetch the records using id through useEffect hook
  useEffect(() => {
    axios.get('http://localhost:3001/getpostbyid/'+id)
    .then(result=> {
        setTitle(result.data.title)
        setDescription(result.data.description)
    })
    .catch(err => console.log(err))
}, [])

  return (
    <div className="post_container">
      <div className="post_form">
        <form onSubmit={handleSubmit}>
            <h2>UPDATE POST</h2>
            <input type="text" placeholder="Enter the Title" value={title}
            onChange={e => setTitle(e.target.value)}/>
            <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Enter the Description" value={description}
            onChange={e => setDescription(e.target.value)}/>
            <button>UPDATE</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost;