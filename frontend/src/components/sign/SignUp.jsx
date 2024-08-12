import React, { useState } from 'react'
import './SignUp.css'
import HeadingComp from './HeadingComp'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

const SignUp = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }

  const url = "http://localhost:3001/api/v1/register";
  const Submit = async (e) => {
    e.preventDefault();
    const { email, username, password } = Inputs
    if (!email || !username || !password) {
      return console.log("All Fields are required!!!");
    }
    await axios.post(url, Inputs)
      .then(response => {
        if(response.data.message==="User Already Exist"){
          alert(response.data.message);
          // history('/signin')
        }else{
          alert(response.data.message);
          setInputs({
            email: "",
            username: "",
            password: "",
          })
          history("/signin")
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response) {
          // Server responded with a status other than 2xx
          if (error.response.status === 400) {
            console.error(error.response.data.message || "Bad Request");
          } else {
            console.error(`Error: ${error.response.status}`);
          }
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received from server");
        } else {
          // Something else happened while setting up the request
          console.error("Error in setting up request");
        }
      })


  }



  return (
    <div className='signup'>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center  ">
            <div className="container d-flex flex-column  w-100 p-5">
              {/* <form className='d-flex flex-column w-100 p-5'  method="post" onClick={submit}> */}
              <input className='p-2 my-3 input-signup' type='email' placeholder='Enter Email' name='email'
                onChange={change}
                value={Inputs.email}
              // autoComplete="on"
              />
              <input className='p-2 my-3 input-signup' type='text' placeholder='Enter Username' name='username'
                onChange={change}
                value={Inputs.username}
              // autoComplete="on"
              />
              <input className='p-2 my-3 input-signup' type='password' placeholder='Enter Password' name='password'
                onChange={change}
                value={Inputs.password}
              // autoComplete='off'
              />
              <button className="btn-signup p-2" type="submit" onClick={Submit}>Sign Up</button>
              {/* <submit className="btn-signup p-2" type="submit" >Sign Up</submit> */}
              {/* </form> */}
            </div>
          </div>
          {/* <div className="col-lg-2"></div> */}
          <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center "
            style={{ height: "100vh" }}
          >
            <HeadingComp first='Sign' second="Up" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp