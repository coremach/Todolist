import React, { useState } from 'react'
import HeadingComp from './HeadingComp'
import './SignIn.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { authActions } from "../../store/index";

const SignIn = () => {
  const dispatch= useDispatch()
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value })
  }

  const url = "http://localhost:3001/api/v1/signin";

  const Submit = async (e) => {
    e.preventDefault();

    const { email, password } = Inputs;

    // Validate inputs - show error message if any field is empty
    if (!email || !password) {
      console.error("All fields are required.");
      return;
    }
    try {
      const response = await axios.post(url, Inputs);
      // console.log(response.data.others);

      setInputs({
        email: "",
        password: "",
      });

      if (response.status === 200) {
        // Navigate to todo page on successful login
        sessionStorage.setItem('id', response.data.others._id);
        history('/todo');
        const getId = sessionStorage.getItem('id')
        dispatch(authActions.login())
        console.log("id : ",getId);
      }
    } catch (error) {
      console.error(error.message);
      if (error.response) {
        // Handle different status codes
        if (error.response.status === 400) {
          console.error(error.response.data.message || "Bad Request");
        } else if (error.response.status === 401) {
          console.error(error.response.data.message || "Invalid Email or password");
          // Navigate to sign up page if status is 401
          history('/signup');
        } else {
          // console.error(`Error: ${error.response.status}`);
          alert("Password is invalid")
          history('/signin');
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received from server");
      } else {
        // Something else happened while setting up the request
        console.error("Error in setting up request");
      }
    }
  }


  // const Submit = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = Inputs
  //   if (!email || !password) {
  //     return console.log("All Fields are required!!!");
  //   }
  //   await axios.post(url, Inputs)
  //   .then(response => {
  //       if (response.request.status === 200) {
  //         console.log(response);
  //         alert(response.data.message);
  //         setInputs({
  //           email: "",
  //           password: "",})
  //         history("/todo")
  //       } else if(response.request.status === 401) {
  //         // alert(response);
  //         console.log(response);

  //         setInputs({
  //           // email: "",
  //           // username: "",
  //           password: "",
  //         })
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       if (error.response) {
  //         // Server responded with a status other than 2xx
  //         if (error.response.status === 400) {
  //           console.error(error.response.data.message || "Bad Request");
  //         } else if(error.response.data.status === 401) {
  //           console.error( error.response.data.message||"Please Sign Up First")
  //           history('/signup')
  //         }else{
  //           console.error(`Error: ${error.response.status}`);
  //         }
  //       } else if (error.request) {
  //         // Request was made but no response received
  //         console.error("No response received from server");
  //       } else {
  //         // Something else happened while setting up the request
  //         console.error("Error in setting up request");
  //       }
  //     })
  //   }




  return (
    <div className='signin'><div className="container">
      <div className="row">
        <div className="col-lg-4 column  d-flex justify-content-center align-items-center "
          style={{ height: "100vh" }}
        >
          <HeadingComp first='Sign' second="In" />
        </div>
        <div className="col-lg-8 column d-flex justify-content-center align-items-center  ">
          <div className="d-flex flex-column w-100 p-5 ">
            <form
              className='d-flex flex-column'
              onClick={Submit}
            >

              <input
                className='p-2 my-3 input-signup'
                type='email'
                placeholder='Enter Email'
                name='email'
                onChange={change}
                value={Inputs.email}

              />
              <input
                className='p-2 my-3 input-signup'
                type='password'
                placeholder='Enter Password'
                name='password'
                onChange={change}
                value={Inputs.password}
                autoComplete='on'
              />
              <button className="btn-signup p-2" type="Submit"
              //  onClick={submit}
              >Sign In</button>
            </form>

          </div>
        </div>
      </div>
    </div></div>
  )
}

export default SignIn