import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const FarmerForm = (props) => {

    const navigate=useNavigate();
    const{batchSelected ,isBatchSelected}=props;
   
    const [formData, setFormData] = useState({
        farmName: "",
        totalLandArea: "",
        cropsGrown: "",
        expected_price: "",
        phoneNo: "",
        quantityCropsGrown:""
      });


      function changeHandler(event) {
        setFormData((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }

  const[isVisible,setVisible]=useState('');

  function submitHandler(event){
       
       toast.success("thanks for your details.")
       navigate('/batchesassigned');
       batchSelected(true);
  }

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()



//   useEffect(() => {
//     if (isSubmitSuccessful) {
//       reset({
//         farmName: "",
//         totalLandArea: "",
//         cropsGrown: "",
//         expected_Price: "",
//         phoneNo: "",
//         quantityCropsGrown:""
//       })
      
//     }
//   }, [reset, isSubmitSuccessful])
  async function submitHandler(){
    try {
        console.log(formData);
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/protected/farmer', formData,{headers: {
            Authorization: `Bearer ${token}`,
        }});// POST request to index.js
      } catch (error) {
        throw new Error("Error occurred while sending form data.");
      }
  }

  return (
    <div>
        <div className="flex justify-center text-4xl text-white my-11">
        <h1>Farmer Details Page</h1>
        </div>
        <div className="flex justify-center text-white">
        <div className={isVisible}>
      <form 
      className="flex flex-col gap-7 "
      onSubmit={submitHandler}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="farmName" className="lable-style">
            Farm Name
          </label>
          <input
            type="text"
            name="farmName"
            id="farmName"
            onChange={changeHandler}
            value={formData.farmName}
            placeholder="Enter your farm name"
            className="form-style p-2 bg-slate-700 rounded-lg"
            // {...register("farmName", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your farm name
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="totalLandArea" className="lable-style">
            Total Land Area
          </label>
          <input
            type="text"
            name="totalLandArea"
            id="totalLandArea"
            onChange={changeHandler}
            value={formData.totalLandArea}
            placeholder="Enter Total Land Area "
            className="form-style  p-2 bg-slate-700 rounded-lg"
            // {...register("totalLandArea")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="text" className="lable-style">
          Crops Grown 
        </label>
        <input
          type="text"
          name="cropsGrown"
          id="cropsGrown"
          onChange={changeHandler}
          value={formData.cropsGrown}
          placeholder="Enter the crops grown "
          className="form-style  p-2 bg-slate-700 rounded-lg"
        //   {...register("cropsGrown", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="text" className="lable-style">
          Expected Price (per kg)
        </label>
        <input
          type="number"
          name="expected_price"
          id="expected_price"
          onChange={changeHandler}
          value={formData.expected_price}
          placeholder="Enter the expected price of crop "
          className="form-style  p-2 bg-slate-700 rounded-lg"
        //   {...register("expected_price", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your expected price . 
          </span>
        )}
      </div>


      <div className="flex flex-col gap-2">
        <label htmlFor="text" className="lable-style">
          Quantity Of Crops Produced 
        </label>
        <input
          type=""
          name="quantityCropsGrown"
          id="quantityCropsGrown"
          onChange={changeHandler}
          value={formData.quantityCropsGrown}
          placeholder="Enter the quantity of crop "
          className="form-style  p-2 bg-slate-700 rounded-lg"
        //   {...register("quantityCropsGrown", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your quantity of Crops Grown  
          </span>
        )}
      </div>

     

    

      <button
        disabled={loading}
         type="submit" onSubmit={submitHandler}
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      
      >
        Submit Details
      </button>
    </form>
    </div>
    </div>
    <div className="my-11"> a</div>
    </div>
  )
}

export default FarmerForm;