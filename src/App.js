import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Components/Home';
import Clinsignup from './Components/Clinsignup';
import AdvocateSignup from './Components/Advosignup';
import ClLogin from './Components/Cllogin';
import AdoLogin from './Components/Advologin';
import AdvocateProfile from './Components/AdvocateProfile';
import Navbar from './Components/navbar';
import OwnProfile from './Components/OwnProfile';
import ClientProfile from './Components/ClientProfile';
import { Chat, Logout } from '@mui/icons-material';
import Form from './Components/Form';


import Viewuser from './Components/Viewuser';
import Bookedclients from './Components/Bookedclients';
import ChatPage from './Components/ChatPage';









const App = () => {
  return (
    <Router>
      <Navbar />
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/client" element={<Clinsignup />} />
        <Route path="/signup/advocate" element={<AdvocateSignup />} />
        <Route path="/login" element={<ClLogin />} />
        <Route path="/login/advocate" element={<AdoLogin />} />
        <Route path="/advocates" element={<AdvocateProfile />} />
        <Route path="/ownprofile" element={<OwnProfile />} />
        <Route path="/clientownprofile" element={<ClientProfile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/form" element={<Form/>} />
        <Route path="/viewappo" element={<Bookedclients/>} />
        <Route path="/viewclients" element={<Viewuser/>} />
       <Route path="/chat/:roomId" element={<ChatPage/>} />
        
      
      </Routes>
    </Router>
  );
};

export default App;
