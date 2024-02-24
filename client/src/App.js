import React from "react";
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import AccountSetup from './AccountSetup';
import UserPage from './UserPage';
import Calculate from './Calculate';
import { BrowserRouter as Router, Route, Routes } from  "react-router-dom";
import { useState, useEffect } from 'react';
import NotFound from './NotFound';
import authStatus from './Helper';

function App() {

  const title = 'Sunscreen Calculator';
  //https://stackoverflow.com/questions/71444637/react-router-hide-nav-footer-on-certain-pages-with-router-v6

  return (
    <Router>
      <div className="App">
        { <div><Navbar /></div> }
        <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/accountsetup/:id" element={<AccountSetup />} />
            <Route path="/userpage/:id" element={<UserPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/calculate" element={<Calculate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
