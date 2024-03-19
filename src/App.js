// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;