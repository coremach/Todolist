import React from 'react'
import './TodoCards.css'
import './Todo.css'
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ item, id, del_id, display,updateId,toBeUpdate }) => {

    return (
        <div className='p-3 todocards todo-cards'>
            <div>
                <h5>{item.title}</h5>
                <p className="todocards-p">{item.body.split("", 77)}...
                </p>
                <div className='d-flex justify-content-around  card-b'>
                    <div className='cards-i c-u d-flex justify-content-center align-items-center '
                        onClick={() => {
                            display("block");
                            toBeUpdate(updateId);
                            
                        }}
                    >
                        <span> <GrDocumentUpdate className='card-icons' />Update</span>
                    </div>
                    <div className='cards-i c-d d-flex justify-content-center align-items-center '
                        onClick={() => {
                            del_id(id)
                        }}
                    >
                        <span ><MdDelete className='del card-icons' />Delete</span>
                    </div >
                </div>
            </div>
        </div>
    )
}

export default TodoCards