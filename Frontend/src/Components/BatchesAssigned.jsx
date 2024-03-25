import React, { useState } from "react";
import axios from 'axios'
import Tours from './Batches';
import Refresh from '../pages/Refresh';
import './index.css'
import {useEffect} from 'react';



export default function BatchesAssigned(){
 const [data,setData] = useState("");
 useEffect(()=>{
  fillData();
 },[])
  async function fillData(){
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/protected/batch',{headers: {
      Authorization: `Bearer ${token}`,
    }});
    setData(response.data);
  }
    const [tour, setTour] = useState(data);
    function removeTour(id) {
        const newTour = tour.filter(tour => tour.id !== id)
        console.log(id);
        setTour(newTour);
      }
      if (tour.length === 0) {
        return <Refresh setTour={setTour} data={data}/>
      }

    return (
        <Tours tours={tour} removeTour={removeTour} />
    )
}