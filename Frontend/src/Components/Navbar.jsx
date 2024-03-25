import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import {useEffect} from 'react';
import FarmerForm from "../pages/FarmerForm";
import BatchesAssigned from "./BatchesAssigned";

const Navbar = (props) => {
    const { isLoggedIn, setIsLoggedIn } = props;
  
    useEffect(() => {
      const loggedIn = localStorage.getItem('token');
      setIsLoggedIn(!!loggedIn);
    }, [setIsLoggedIn]);

  async function Dologout(){
    try{
     const token = localStorage.getItem('token');
     await axios.post('http://localhost:5000/auth/logout',{},{headers: {
       Authorization:`Bearer ${token}`,
   }});
     localStorage.removeItem('token');
     setIsLoggedIn(false);
    }catch(err){
     console.log(err.message);
    }
 }

  return (
    <div className="w-11/12 max-w-[1160px] mx-auto flex flex-row justify-between items-center py-4 " >
      {/* Logo */}
      <div >
        <Link to="/" className="flex">
          <img src={Logo} alt="Logo" height={22} width={70} loading="lazy" className="rounded-full"/>
          <h1 className="text-white my-5 mx-3 text-2xl">FARMERS HUB</h1>
        </Link>
      </div>

      <nav >
        <ul className="flex gap-x-8 text-richblack-25 ">
          {/* changes kiye hai  */}
         { !isLoggedIn &&
           <li >
           <Link to="/" >Home</Link>
         </li>
         }

         { isLoggedIn &&  
         <li >
          <Link to="/wheater" >Weather <br/> Conditions</Link>
         </li>
         }
          { isLoggedIn  &&  
         <li>
          <Link to="/batchesassigned">Batches <br/> Assigned</Link>
         </li>
         }
          {isLoggedIn  &&  
         <li>
          <Link to="/farmerform">Enter Land<br/>Details</Link>
         </li>
         }
         { isLoggedIn &&
           <li>
           <Link to="/diseaseDetection">Disease <br/> Detection</Link>
         </li>
         }
         {
           isLoggedIn &&
            <li>
             <Link to="/dashboard">Profile <br/> Page</Link>
            </li>
            
         }

         { !isLoggedIn &&
           <li>
           <Link to="/about">About</Link>
         </li>
        }

          {
           isLoggedIn &&
            <li>
             <Link to="/soilanalysis">Soil  Analysis <br/> Report</Link>
            </li>
            
         }

        { !isLoggedIn &&
         <li>
           <Link to="/contact">Contact</Link>
         </li>
         }
        </ul>
      </nav>

      {/* Button Group  */}
      <div className="flex items-center gap-x-4 text-richblack-100">
        {!isLoggedIn && (
          <Link to="/login">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">Log in</button>
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/signup">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">Sign up</button>
          </Link>
        )}

        {isLoggedIn && (
          <Link to="/">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700" onClick={async () => {
              await Dologout();
              toast.success("Logged out");
            }}>Log out</button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/dashboard">
            <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
