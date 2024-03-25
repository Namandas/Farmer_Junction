import React from 'react';
import { useState, useEffect } from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import './Footer.css'; // Import CSS file for custom styles


export default function Footer() {
  return (
    <div className="bg-gray-700 py-2 ">
      <div className='flex justify-center item-center'>
        <div className='flex gap-5 text-2xl my-2 py-2 footer-icons'>
          <a href="https://www.google.com"   ><FaFacebook/></a>
          <a href="https://www.facebook.com" ><FaGoogle/></a>
          <a href="https://www.twitter.com"  ><FaTwitter/></a>
          <a href="https://www.youtube.com" ><FaYoutube/></a>
        </div>
      </div>
      <hr className='p-2 '/>
      <div className='py-2 flex justify-center items-center'>
        <div>@2024 Copyright: AgricultureHub.com</div>
      </div>
    </div>
  );
}
