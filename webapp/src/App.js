import './App.css';
import React, { useEffect } from 'react';
import HomePage  from './Homepage/HomePage.js'
import SignUp from './SignUp/SignUp.js'
import instance from './axios.js'
import ChatPortal from './Chatportal/ChatPortal.js';
import ResetPassword from './Reset/ResetPassword.js';
import {Routes, Route, BrowserRouter} from 'react-router-dom'

instance.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/chatportal" element={<ChatPortal />} />
          <Route path="/reset/:token" element={<ResetPassword />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
