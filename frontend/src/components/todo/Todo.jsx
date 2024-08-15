import React, { useCallback, useEffect, useState } from 'react'
import './Todo.css'
import './update.css'
import TodoCards from './TodoCards'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Update from './Update';
// import { useDispatch } from 'react-redux';
// import { authActions } from "../../store/index";
import axios from 'axios';
import env from 'react-dotenv'

let toUpdateArray = []
let id = sessionStorage.getItem('id')



const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" })
    const [Array, setArray] = useState([])


    const show = () => {
        document.getElementById('textarea').style.display = "block";
    }
    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    }
    const Submit = useCallback(async () => {
        if (Inputs.title === "" && Inputs.body === "") {
            toast.error("Title Or Body should not by Empty")
        }
        else {
            if (id) {
                await axios.post(`${env.REACT_APP_BASE_URL}+"/api/v2/addTask`, {
                    title: Inputs.title,
                    body: Inputs.body,
                    id: id
                })
                    // .then((response) => {
                    //     console.log(response);
                    // })
                setInputs({ title: "", body: "" })
                toast.success(`${Inputs.title} is added successfully 💘`)
            } else {

                setArray([...Array, Inputs])
                setInputs({ title: "", body: "" })
                toast.success(`${Inputs.title} is added successfully 💘`)
                toast.error("Your task is not saved")
            }

        }


    }, [Array,Inputs]);

    const del = async (task_id) => {
        if (id) {
            await axios
                .delete(`${env.REACT_APP_BASE_URL}+"/api/v2/deleteTask/${task_id}`, {
                    data: { id: id }
                })
                .then(() => {
                    toast.success("Task is deleted 💔")
                })
                .catch(err => console.log(err)
                )
        }
        else {
            Array.splice(id, '1');
            setArray([...Array])
        }


    }

    function updateShow(value) {
        document.getElementById("todo-update").style.display = value;
    }

    const update = (value) => {
        toUpdateArray = Array[value];

    }


    useEffect(() => {
        const fetchTasks = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${env.REACT_APP_BASE_URL}/api/v2/getTasks/${id}`);
                    setArray(response.data.list);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            }
        };

        fetchTasks();
    }, [Submit]);

    // useEffect(() => {
    //     const fetch = async () => {
    //         await axios
    //             .get(`${env.REACT_APP_BASE_URL}+"/api/v2/getTasks/${id}`)
    //             .then((response) => {
    //                 setArray(response.data.list);
    //             })
    //             .catch(err => console.log(err))
    //     }
    //     fetch();
    // }, [Submit]);


    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className="todo-main container flex-column d-flex justify-content-center align-elements-center my-4 p-2">
                    <div className="d-flex flex-column todo-inputs-div w-35">
                        <input
                            className='my-2 p-2 todo-inputs'
                            type="text"
                            name="title"
                            id=""
                            placeholder='Title'
                            onClick={show}
                            value={Inputs.title}
                            onChange={change} />
                        <textarea
                            className='my-2 p-2 todo-inputs'
                            type="text"
                            name="body"
                            id="textarea"
                            placeholder='Body'
                            value={Inputs.body}
                            onChange={change} />
                    </div>

                    <div className="mt-2  todo-inputs-div d-flex flex-column">
                        <button className="btn btn-todo " onClick={Submit} >Save</button>
                    </div>

                </div>

                <div className="todo-body   ">
                    <div className="container-fluid ">
                        <div className="row">

                            {Array && Array.map((item, index) => (
                                <>
                                    <div className="d-flex justify-content-center m-3 my-2 " key={index} >
                                        <TodoCards
                                            item={item}
                                            id={item._id}
                                            del_id={del}
                                            display={updateShow}
                                            updateId={index}
                                            toBeUpdate={update}
                                        />
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <div className="todo-update mx-4" id='todo-update'>
                <div className="container update " >
                    <Update display={updateShow} update={toUpdateArray} />
                </div>

            </div>
        </>
    )
}

export default Todo