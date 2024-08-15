import React, { useEffect } from 'react';
import Navbar from './components/navbar'
import Home from './components/home/home';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import SignUp from './components/sign/SignUp';
import SignIn from './components/sign/SignIn';
import Todo from './components/todo/Todo';
import { useDispatch } from 'react-redux';
import { authActions } from "./store/index";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TestSessionStorage from './components/sessiontest';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id){

      dispatch(authActions.login());
    }
  })


  return <>
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/todo' element={<Todo />} />
          <Route exact path='/sessionTest' element={<TestSessionStorage />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/signin' element={<SignIn />} />
        </Routes>
      </Router>
      {/* <About /> */}
      <Footer />
    </div>
  </>
}
export default App;
