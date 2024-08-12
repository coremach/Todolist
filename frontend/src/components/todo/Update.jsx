import React from 'react'
import './update.css'
import { ImCross } from "react-icons/im";

const Update = ({display}) => {
  
  return (
    <div className='p-5  d-flex justify-content-center align-items-center flex-column '>
      <div className="cross" onClick={()=>{display("none")}}><ImCross className='cross-icon' /></div>
      <h3>Update Your Task</h3>
      <input type="text" className="todo-inputs my-4 w-100 p-3" placeholder='Title' />
      <textarea className='todo-inputs w-100 p-3' placeholder='Body' />
      <button className="btn btn-dark my-4">UPDATE</button>
    </div>
  )
}

export default Update