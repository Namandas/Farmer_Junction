import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import axios from 'axios';

const LoginForm = (props) => {
    const setIsLoggedIn = props.setIsLoggedIn;
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const sendFormData = async (formData) => {
        try {
          const response = await axios.post('http://localhost:5000/auth/login', formData);
          localStorage.setItem('token', response.data.message);
        } catch (error) {
          throw new Error("Error occurred while sending form data.");
        }
      };
      async function loadHomePage(){
        try{
            const token = localStorage.getItem('token');
            await axios.get('http://localhost:5000/protected/dashboard',{headers: {
                Authorization: `Bearer ${token}`,
            }});
            navigate('/dashboard');
        }
        catch(err){
            console.log(err.message);
        }
      }

    function changeHandler(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    async function submitHandler(event) {
        event.preventDefault();
        try {
            await sendFormData(formData);
            toast.success("Login Success");
            setIsLoggedIn(true);
            await loadHomePage();
        }catch(err){
            toast.error("Incorrect Email or Password. Please try again.");
        }    
    }

    return (
        <form
            onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6"
        >
            <label htmlFor="" className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Email Address
                    <sup className="text-pink-200">*</sup>
                </p>

                <input
                    type="email"
                    required
                    value={formData.email}
                    placeholder="Enter your email address"
                    onChange={changeHandler}
                    name="email"
                    className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                />
            </label>

            <label htmlFor="" className="w-full relative">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Password
                    <sup className="text-pink-200">*</sup>
                </p>

                <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    placeholder="Enter Password"
                    onChange={changeHandler}
                    name="password"
                    className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                />

                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] cursor-pointer "
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>

                <Link to="#">
                    <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-semibold text-richblack-900">
                Sign in
            </button>
        </form>
    );
};

export default LoginForm;