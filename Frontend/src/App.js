import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./Components/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Signup from "./pages/Signup"
import PrivateRoute from "./Components/PrivateRoute";
import FourOfourPage from './pages/FourOfourPage.jsx';
import Footer from './Components/Footer.jsx'
import Wheater from './pages/WheaterApp.jsx'
import DiseaseDetection  from "./pages/DiseaseDetection.jsx";
import SoilAnalysis from './pages/SoilAnalysis.jsx'
import FarmerForm from './pages/FarmerForm.jsx';
import BatchesAssigned from "./Components/BatchesAssigned.jsx";

// backend code 
import axios from 'axios';
import {useEffect} from 'react';




function App() {

  //backend code

  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  if(!!localStorage.getItem('token')){
    async function verify() {
      try {
        const token = localStorage.getItem('token');
        await axios.get('http://localhost:5000/protected/verify',{headers: {
          Authorization: `Bearer ${token}`,
      }});
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    }
    
    verify(); 
  }else{
    setIsLoggedIn(false);
  }
    
  });

  useEffect(() => {
    const handleBackButton = (e) => {
      // Check if the user is on the login page and isLoggedIn is true
      if (window.location.pathname === "/login" && isLoggedIn) {
        setIsLoggedIn(false);
       
        localStorage.removeItem('token');
      }
    };

    window.addEventListener('popstate', handleBackButton); // Listen for back button press

    return () => {
      window.removeEventListener('popstate', handleBackButton); // Clean up event listener
    };
  }, [isLoggedIn]);

  return (
    <div className="w-screen main_content h-full bg-richblack-900 flex flex-col ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/batchesassigned" element={<BatchesAssigned  />} />
        <Route path="/wheater" element={<Wheater />} />
        <Route path="/diseaseDetection" element= {<DiseaseDetection/> } />
        <Route path="/four" element={<FourOfourPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/farmerform" element={<FarmerForm   />} />
        <Route path="/soilanalysis" element={<SoilAnalysis />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        {/* dashboard refers to profile page */}
        <Route path="/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard /></PrivateRoute>} />
      </Routes>
      <Footer setIsLoggedIn={setIsLoggedIn}></Footer>
    </div>
  )
}

export default App;
