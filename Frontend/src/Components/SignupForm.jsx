import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 

const SignupForm = ({setIsLoggedIn}) => {
  const [accountType, setAccountType] = useState("student");
  const[isVisible,setVisible]=useState(false);
  const navigate = useNavigate();
  const [otp,setOtp] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
    address:"",
    phoneNumber:"",
    city:"",
    district:"",
    state:"",
    country:"",
    otp:""
  });


 


  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const [showPassword, setShowPassword] = useState({
    createPassword: false,
    confirmPassword: false,
  });

  const handleClick = (buttonName) => {
    setShowPassword({
      ...showPassword,
      [buttonName]: !showPassword[buttonName],
    });
  };

  const submitHandler = async(event) => {
    event.preventDefault();
    if (formData.createPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
     setVisible(true);
    const finalData = {
      ...formData,
      accountType
    }

  //  transferring the data to the datbase through post req 
    try {
      await sendFormData(finalData);
    } catch (error) {
      console.error("Error occurred while sending form data:", error);
      toast.error("Error occurred while creating account. Please try again.");
    }
  }

  const sendFormData = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/otp',formData);
      setOtp(response.data);
     // POST request to index.js
    } catch (error) {
      throw new Error("Error occurred while sending form data.");
    }
  };
  async function submitOtpHandler(){
    console.log(formData.otp);
    console.log(otp);
    if(otp == formData.otp){
       await axios.post('http://localhost:5000/auth/signup', formData); 
       toast.success("User registered Successfully");
    }
    else{
      toast.error("Wrong OTP");
      navigate("/signup");
    }
  }
  return (
   <div >
   {
    !isVisible &&  
    <div className={isVisible}>
    <div className="mt-8">
      {/* Button Group */}
      <div className="flex bg-richblack-800 max-w-max rounded-full p-1 gap-x-1">
        <button
          className={`${accountType === "Farmer"
            ?
            "bg-richblack-900 text-richblack-5"
            : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
          onClick={() => setAccountType("Farmer")}>
          Farmer
        </button>

   
      </div>

      {/* Form */}
      <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="firstName"
              id="firstName"
              onChange={changeHandler}
              value={formData.firstName}
              placeholder="Enter first name"
            />
          </label>

          <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Last Name<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="lastName"
              id="lastName"
              onChange={changeHandler}
              value={formData.lastName}
              placeholder="Enter last name"
            />
          </label>
        </div>

        <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              City<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="city"
              id="city"
              onChange={changeHandler}
              value={formData.city}
              placeholder="Enter City"
            />
          </label>

          <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              District<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="district"
              id="district"
              onChange={changeHandler}
              value={formData.district}
              placeholder="Enter district"
            />
          </label>


          <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              State<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="state"
              id="state"
              onChange={changeHandler}
              value={formData.state}
              placeholder="Enter State"
            />
          </label>

          <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Country<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="country"
              id="country"
              onChange={changeHandler}
              value={formData.country}
              placeholder="Enter country"
            />
          </label>




          <label className="w-full">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Phone Number<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              onChange={changeHandler}
              value={formData.phoneNumber}
              placeholder="Enter Phone Number"
            />
          </label>
        
        <label className="w-full">
          <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
            required
            type="email"
            name="email"
            id="email"
            value={formData.email}
            placeholder="Enter email address"
            onChange={changeHandler}
          />
        </label>

        <div className="flex gap-x-4">
          <label className="w-full relative">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type={showPassword.createPassword ? "text" : "password"}
              name="createPassword"
              id="createPassword"
              onChange={changeHandler}
              value={formData.createPassword}
              placeholder="Enter Password"
            />

            <span
              className="absolute top-[38px] right-3 z-10 cursor-pointer"
              onClick={() => handleClick("createPassword")}
            >
              {showPassword.createPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
              required
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
            />

            <span
              className="absolute top-[38px] right-1.5 z-10 cursor-pointer"
              onClick={() => handleClick("confirmPassword")}
            >
              {showPassword.confirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
          </label>
        </div>

        <button className="bg-yellow-50 text-richblack-900 font-semibold px-[12px] rounded-[8px] py-[8px] mt-6">
          Create Account
        </button>
      </form>

    
    </div>
    </div>
   }

 {/* input form  */}
   {
    isVisible && 
    <div >
      <form>
    <label className="w-full">
          <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
            O T P<sup className="text-pink-200">*</sup>
          </p>
          <input
            className="bg-richblack-800 rounded-[4px] w-full px-[12px] py-[8px]"
            required
            type="text"
            name="otp"
            id="otp"
            value={formData.otp}
            placeholder="Enter OTP Number"
            onChange={changeHandler}
          />
        </label>
        <button className="bg-yellow-50 text-richblack-900 font-semibold px-[12px] rounded-[8px] py-[8px] mt-6" onClick={submitOtpHandler}>
          Submit OTP
        </button>
        </form>
    </div>
   }
   </div>
  );
};

export default SignupForm;