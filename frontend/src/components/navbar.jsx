import React from "react";
import './navbar.css';
import { RiContactsBook2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import { authActions } from "../store/index";

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn =useSelector((state) => state.isLoggedIn);
    const logout = ()=>{
        sessionStorage.clear("id")
        dispatch(authActions.logout());
    }
    console.log(isLoggedIn);
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <RiContactsBook2Fill />&nbsp;TodoList
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link active" aria-current="page" to="/sessionTest">SessionTest</Link>
                        </li>
                        {!isLoggedIn && <>
                        <li className="nav-item mt-0 mx-1 pt-0">
                            <Link className="nav-link active px-2 btn-nav" aria-current="page" to="/signin">Sign In</Link>
                        </li>
                        <li className="nav-item mt-0 mx-1 pt-0">
                            <Link className="nav-link active px-2 btn-nav" aria-current="page" to="/signup">Sign Up</Link>
                        </li>
                        </>}
                        {isLoggedIn && <>
                        <li className="nav-item mt-0 mx-1 pt-0" onClick={logout}>
                            <Link className="nav-link active px-2 btn-nav text-white" aria-current="page" to="/">Sign Out</Link>
                        </li>
                        <li className="nav-item mx-1" onClick={logout}>
                            <img className="img-fluid mx-2 user-png" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s" alt="/" srcset="" />
                        </li>

                        </>}

                    </ul>

                </div>
            </div>
        </nav>
    </>
}


export default Navbar;