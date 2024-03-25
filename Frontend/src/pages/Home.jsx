// Icons Import
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

// Image and Video Import
import Banner from "../assets/Images/farming_video.mp4"
// Component Imports

import CTAButton from "../Components/core/HomePage/Button.jsx"
import CodeBlocks from "../Components/core/HomePage/CodeBlocks.jsx"
import HighlightText from "../Components/core/HomePage/HighlightText.jsx"


function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Become a Instructor Button */}
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Join Us Now</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Increase your argiculture growth 
          <HighlightText text={"Providing a One to One AI Mentor"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
            Integrating technology with farming to make India a Farming Hub
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/about"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
           Login
          </CTAButton>
        </div>

        {/* Video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className=" shadow-[2px_2px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
           
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlocking the 
                <HighlightText text={"Agriculture potential"} /> Potential of Your Land: Soil, Climate, 
                and Crop Insights Await!
              </div>
            }
            subheading={
              "Welcome to our agri-tech hub! We empower farmers with soil analysis, weather forecasts, and personalized crop insights. Our AI chatbot acts as your virtual agronomist, guiding you through every season and challenge. From climate adaptation to daily crop monitoring, we're here to support your farming journey."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/about",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`
            Certainly! Here are the benefits of our website:
            
            Soil Analysis: Gain comprehensive insights into your soil's health, enabling you to make informed decisions about crop selection, fertilization, and irrigation.
            
            Weather Forecasts: Access accurate and timely weather forecasts tailored to your location, allowing you to plan and manage farming activities effectively.
            
            Personalized Crop Insights: Receive customized recommendations for crop management based on real-time data, optimizing yield and minimizing risks.
            
            AI Chatbot Support: Interact with our AI chatbot, your virtual agronomist, for instant assistance and guidance on a wide range of farming-related queries, available 24/7.
            
            Climate Adaptation: Stay ahead of climate change impacts with tools and resources designed to help you adapt your farming practices to shifting weather patterns and environmental conditions.`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

       
      </div>

    
    </div>
  )
}

export default Home