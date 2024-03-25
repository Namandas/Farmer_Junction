import {useEffect,useState} from  'react'
import { RiEditBoxLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import user_profile from '../assets/login.png'
import axios from 'axios';



export default function MyProfile() {

  async function fetchUserData() {
    try {
      const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/protected/profile', {headers: {Authorization: `Bearer ${token}`}});
        return(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      //load 404
       // Handle error as per your application's requirement
    }
  }
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUserData();
        const constructedUser = {
          firstName: userData.firstname,
          lastName: userData.lastname,
          email: userData.email,
          image: user_profile, 
          additionalDetails: {
            address: userData.address,
            gender: "male", 
            contactNumber: userData.phonenumber
          }
        };
        setUser(constructedUser);
      } catch (error) {
        // Handle error if required
      }
    }

    fetchData();
  }, []);

  const navigate = useNavigate()

  return (
    <>
      <div className="flex justify-center">
        <div className="w-2/5 ">
        <div className='flex justify-center text-center my-11'>
        <h1 className="mb-14 text-4xl font-semibold text-richblack-5">
            My Profile
          </h1>
        </div>
          <div className="flex items-center bg-gradient-to-r  bg-slate-400 justify-between rounded-lg border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex items-center gap-x-4">
              <img
                src={user?.image}
                alt = "image"
                className="aspect-square w-[78px] rounded-lg object-cover"
              />
              <div className="space-y-1">
                <p className=" font-semibold text-black text-3xl">
                  {user?.firstName + " " + user?.lastName}
                </p>
                <p className="text-base text-richblack-300">{user?.email}</p>
              </div>
            </div>
          </div>
        
          <div className="my-10 flex bg-gradient-to-r bg-slate-400 flex-col gap-y-10 rounded-lg border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
              <p className=" font-semibold text-black text-2xl">
                Personal Details
              </p>
            </div>
            <div className="flex max-w-[500px] justify-between">
              <div className="flex flex-col gap-y-5">
                <div>
                  <p className="mb-2 text-base  text-richblack-600 font-bold">First Name</p>
                  <p className="text-base font-medium text-black ">
                    {user?.firstName}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-base text-richblack-600 font-bold">Email</p>
                  <p className="text-base font-medium  text-slate-900">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-base text-richblack-600 font-bold">Gender</p>
                  <p className="text-base font-medium  text-slate-900">
                    {user?.additionalDetails?.gender ?? "Add Gender"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <div>
                  <p className="mb-2 text-base text-richblack-600  font-bold">Last Name</p>
                  <p className="text-base font-medium  text-slate-900">
                    {user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-base text-richblack-600 font-bold">Phone Number</p>
                  <p className="text-base font-medium  text-slate-900">
                    {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                  </p>
                </div>
                {/* <div>
                  <p className="mb-2 text-base text-richblack-600">Date Of Birth</p>
                  <p className="text-base font-medium text-richblack-5">
                    {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                      "Add Date Of Birth"}
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}