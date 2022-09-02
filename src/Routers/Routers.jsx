import React from 'react'
import {Routes,Route} from "react-router-dom";
import Login from '../components/Login/Login';
import Navbar from '../components/Navbar/Navbar';
import Register from '../components/Register/Register';


const Routers = () => {
  return (
    <>
     <Navbar/>
      <Routes>
       
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default Routers