import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {toast} from 'react-hot-toast'
import Loading from '../assets/Images/loading.gif'
import axios  from 'axios';
import './index.css'

const ContactUsForm = () => {
      



    const arrangeData = (data) => {
        const arrangedData = {};
        let currentHeading = '';
        let currentSubheading = '';
      
        for (const key in data) {
          const value = data[key];
          if (key.startsWith('heading')) {
            currentHeading = value;
            arrangedData[currentHeading] = {};
          } else if (key.startsWith('subheading')) {
            currentSubheading = value;
            arrangedData[currentHeading][currentSubheading] = [];
          } else if (key.startsWith('para')) {
            arrangedData[currentHeading][currentSubheading].push(value);
          }
        }
      
        return arrangedData;
      };



  const[isVisible,setVisible]=useState('');
  

  function submitHandler(event){
       setVisible('hidden');
       toast.success("thanks for your review.")
       event.preventDefault();
  }

  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()



  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])


  useEffect(()=>{
    toast.success("Please wait while the data is uploaded");
  },[])

  const[N,setN]=useState(0);
  const[P,setP]=useState(0);
  const[K,setK]=useState(0);
  const[temperature,setTemperature]=useState(0);
   const[humidity,setHumidity]=useState(0);
   const[ph,setPh]=useState(0);
   const[rainfall,setRainfall]=useState(0);
   const[label,setLabel]=useState(0);
   const[cropDetails,setCropDetails]=useState(0);
 
   const[info,setInfo]=useState('');


  const [image, setImage] = useState(null)

// Inside your ContactUsForm component

async function getcropName() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/protected/cropname',{headers: {
        Authorization: `Bearer ${token}`,
    }});
    const cropData = response.data.cropData;
        const arrangedData = {
        text: {}
    };
    setImage(cropData.image);
    cropData.indices.forEach((index) => {
        arrangedData.text[index] = cropData.text[index];
    });
    const soil = response.data.soil;
    console.log(soil);
    setN(soil.nitrogenlevel);
    setHumidity(soil.humidity);
    setPh(soil.phlevel);
    setP(soil.phosphorouslevel);
    setK(soil.potassiumlevel);
    setRainfall(soil.rainfall);
    setTemperature(soil.temperature);
    const dataArray = [];
    Object.keys(arrangedData.text).forEach(key => {
        //data to render 
        if(key[0] == 'H' || key[0] =='h'){
            dataArray.push({Heading : `${arrangedData.text[key]}`} );
        }
        if(key[0] == 'S' || key[0] =='s'){
            dataArray.push({subHeading : `${arrangedData.text[key]}`} );
        }
        if(key[0] == 'p' || key[0] =='P'){
            dataArray.push({para : `${arrangedData.text[key]}`} );
        }
  });
  //console.log(dataArray);
  const renderData = () => {
    const elements = [];
    for (var i = 0; i < dataArray.length; i++) {
      Object.keys(dataArray[i]).forEach((key) => {
        if (key === 'Heading') {
          elements.push(
            <h1 key={i} className="flex  p-4 text-4xl   border-b-2 text-white  ">
              {dataArray[i].Heading}
            </h1>
          );
        } else if (key === 'subHeading') {
          elements.push(
            <h3 key={i} className="mx-4 mt-4 mb-2 text-2xl  font-semibold text-slate-200 ">
              {dataArray[i].subHeading}
            </h3>
          );
        } else if (key === 'para') {
          elements.push(
            <p key={i} className="px-4 py-2 text-slate-300">
              {dataArray[i].para}
            </p>
          );
        }
      });
    }
    return elements;
  };
  
  setInfo(renderData());
   
  
 } catch (error) {
    console.error('Error fetching image:', error);
  }
}
  useEffect(() => {
    getcropName();
  }, [])

  return (
    <div>
       <div className="flex justify-center text-white text-4xl font-bold my-11">
       <h1>Soil Analysis Report</h1>
       </div>
        <div className="flex justify-center items-center">
        <div className="w-3/5">
        <div className={isVisible} >
      <form 
      className="flex flex-col gap-7 "
      onSubmit={submitHandler}
    >
    {/* line 1 */}

      <div className="flex justify-between">
      <div className="flex flex-col gap-2 lg:w-[48%]">

          <label htmlFor="firstname" min="0" max= "14" className="lable-style text-white">
            pH Level 
          </label>
          <input
        //   code kharab
            type="range"
            name="firstname"
            readOnly={true}
            placeholder=""
            disabled 
            value={ph}
            className="form-style p-2 bg-slate-700 rounded-lg text-white text-center "
            {...register("firstname", { required: true })}
          />
          <div className="text-white text-center flex justify-between">
           <div> Min: 0</div>
            <div> Max: 14</div>
          </div>
          
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

      
        <div className="mx-11">as</div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" min={0} max= {140} className="lable-style text-white">
            Nitrogen
          </label>
          <input
        //   code kharab
            type="range"
            name="N"
            readOnly={true}
            placeholder=""
            disabled 
            value={N}
            className="form-style p-2 bg-slate-700 rounded-lg text-white text-center "
            {...register("firstname", { required: true })}
          />
          <div className="text-white text-center flex justify-between">
           <div> Min: 0</div>
            <div> Max: 140</div>
          </div>
          
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter nitrogen level.
            </span>
          )}
        </div>
        

        
      </div>
  
      <div className="flex justify-between">
       


      <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="P" min={0} max= {145} className="lable-style text-white">
            Phosphorous
          </label>
          <input
        //   code kharab
            type="range"
            name="P"
            readOnly={true}
            placeholder=""
            disabled 
            value={P}
            className="form-style p-2 bg-slate-700 rounded-lg text-white text-center "
            {...register("firstname", { required: true })}
          />
          <div className="text-white text-center flex justify-between">
           <div> Min: 0</div>
            <div> Max: 145</div>
          </div>
          
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>



        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="K" min={0} max= {205} className="lable-style text-white">
            Pottasium
          </label>
          <input
        //   code kharab
            type="range"
            name="K"
            readOnly={true}
            placeholder=""
            disabled 
            value={K}
            className="form-style p-2 bg-slate-700 rounded-lg text-white text-center "
            {...register("firstname", { required: true })}
          />
          <div className="text-white text-center flex justify-between">
           <div> Min: 0</div>
            <div> Max: 205</div>
          </div>
          
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

      </div>

       <div className="flex justify-between">
       <div className="flex flex-col gap-2 lg:w-[48%] ">
          <label htmlFor="rainfall" min="0" max= "300" className="lable-style text-white">
            Rainfall
          </label>
          <input
        //   code kharab
            type="range"
            name="rainfall"
            readOnly={true}
            placeholder=""
            disabled 
            value={rainfall}
            className="form-style p-2 bg-slate-700 rounded-lg text-white text-center "
            {...register("firstname", { required: true })}
          />
          <div className="text-white text-center flex justify-between">
           <div> Min: 0</div>
            <div> Max: 300</div>
          </div>
          
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
       <div className="mx-11">as</div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="humidity" min="0" max= "100" className="lable-style text-white">
           Humidity 
          </label>
          <input
        //   code kharab
            type="range"
            name="humidity"
            readOnly={true}
            placeholder=""
            disabled 
            value={humidity}
            className="form-style p-2 bg-slate-700 rounded-lg text-white text-center "
            {...register("firstname", { required: true })}
          />
          <div className="text-white text-center flex justify-between">
           <div> Min: 0</div>
            <div> Max: 100</div>
          </div>
          
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

       </div>


       <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="humidity" min="0" max= "100" className="lable-style text-white">
           Temperature 
          </label>
          <input
        //   code kharab
            type="range"
            name="temperature"
            readOnly={true}
            placeholder=""
            disabled 
            value={temperature}
            className="form-style p-2 bg-slate-700 rounded-lg text-white text-center "
            {...register("firstname", { required: true })}
          />
          <div className="text-white text-center flex justify-between">
           <div> Min: 0<sup>o</sup>C</div>
            <div> Max: 100<sup>o</sup>C</div>
          </div>
          
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>

    
        <img src={`data:image/png;base64,${image}`} alt="Crop Image" />
    </form>
    </div>
        </div>
    </div>




    <div className="text-white m-11">
          {info}
    </div>



    </div>
  )
}

export default ContactUsForm;