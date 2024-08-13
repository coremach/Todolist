import React, { useState,useEffect } from 'react'
import './update.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ImCross } from "react-icons/im";
const id = sessionStorage.getItem('id')

const Update = ({ display, update, }) => {
  useEffect(() => {
    setInputs({
      title: update.title,
      body: update.body,
    })
  }, [update]);

  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
  })

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }
  const Submit = async () => {
    if (id) {
      await axios
        .put(`http://localhost:3001/api/v2/updateTask/${update._id}`, {
          data: {
            user_Id: id,
            task_Id: update._id,
            title: Inputs.title,
            body: Inputs.body,
          }
        }
        )
        .then((res) => {
          toast.success("Task is updated 💞")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }






  return (
    <div className='p-5  d-flex justify-content-center align-items-center flex-column '>
      <div className="cross" onClick={() => { display("none") }}><ImCross className='cross-icon' /></div>
      <h3>Update Your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        placeholder='Title'
        value={Inputs.title}
        name='title'
        onChange={change} />

      <textarea
        className='todo-inputs w-100 p-3'
        placeholder='Body'
        value={Inputs.body}
        name='body'
        onChange={change} />
      <button
        className="btn btn-dark my-4"
        onClick={Submit}
      >UPDATE</button>
    </div>
  )
}

export default Update