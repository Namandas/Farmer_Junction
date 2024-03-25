import React, { useState, useEffect } from "react";
import cloudIcon from '../assets/Images/cloud.png';
import humidityIcon from '../assets/Images/humidity.png';
import loadingIcon from '../assets/Images/loading.gif';
import notFoundIcon from '../assets/Images/not-found.png';
import searchIcon from '../assets/Images/search.png';
import windIcon from '../assets/Images/wind.png';
import axios from 'axios';
const API_KEY = "168771779c71f3d64106d8a88376808a";

const WeatherApp = () => {
  const [currentTab, setCurrentTab] = useState("userWeather");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);

  useEffect(() => {
    fetchWeatherInfoForJaipur();
  }, []);

  const showPosition = (position) => {
    const userCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
    sessionStorage.setItem("userCoordinates", JSON.stringify(userCoordinates));
    fetchWeatherInfo(userCoordinates);
  };

  const fetchWeatherInfoForJaipur = async () => {
    const token = localStorage.getItem('token');
    const  response = await axios.get('http://localhost:5000/protected/location',{headers: {
        Authorization: `Bearer ${token}`,
    }});
    console.log(response.data);
    const searchInput = response.data;
      const responseLat = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API_KEY}&units=metric`
      );
       // Coordinates for Jaipur
       console.log(responseLat.data.coord)
    fetchWeatherInfo(responseLat.data.coord);
  };

  const switchTab = (tab) => {
    setCurrentTab(tab);
    if (tab === "userWeather") {
      const localCoordinates = sessionStorage.getItem("userCoordinates");
      if (localCoordinates) {
        const coordinates = JSON.parse(localCoordinates);
        fetchWeatherInfo(coordinates);
      }
    }
  };

  const fetchWeatherInfo = async (coordinates) => {
    const { lat, lon } = coordinates;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (!data.sys) {
        throw data;
      }
      setWeatherInfo(data);
    } catch (err) {
      setError(err.message || "Error fetching weather information");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (!data.sys) {
        throw data;
      }
      setWeatherInfo(data);
    } catch (err) {
      setError(err.message || "City not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper bg-gradient-to-r from-sky-500 to-indigo-500 min-h-screen p-8 ">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Weather Info Of Your City</h1>
      </div>
      <div className="tabContainer mb-8 flex justify-evenly">
        <p
          className={`tab ${currentTab === "userWeather" ? "currentTab" : ""}`}
          onClick={() => switchTab("userWeather")}
        >
          <div className=" p-2 rounded-2xl border-blue text-white border-4 cursor-pointer">Your Weather</div>
        </p>
        <p
          className={`tab ${currentTab === "searchWeather" ? "currentTab" : ""}`}
          onClick={() => switchTab("searchWeather")}
        >
          <div className="border p-2 rounded-2xl border-blue text-white border-4 cursor-pointer ">Search Weather</div>
        </p>
      </div>
      <div className="container">
        {currentTab === "searchWeather" && (
          <div className="flex justify-center">
            <form className="formContainer mb-8" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search for city..."
                className="bg-white rounded-lg px-4 py-2 mr-2"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="btn">
                <img src={searchIcon} alt="Search" width="20" height="20" loading="lazy" />
              </button>
            </form>
          </div>
        )}
        {loading && (
          <div className="subContainer loadingContainer">
            <img src={loadingIcon} width="150" height="150" alt="Loading" />
            <p>Loading</p>
          </div>
        )}
        {weatherInfo && (
          <div className="userInfoContainer subContainer">
            <div className="name flex justify-center">
              <p className="text-2xl text-slate-300 font-semibold">{weatherInfo.name}</p>
              <img
                src={`https://flagcdn.com/144x108/${weatherInfo.sys.country.toLowerCase()}.png`}
                alt="Country Flag"
                height={11}
                width={26}
                className="mx-3"
              />
            </div>
            <div className="flex justify-center m-11 gap-3 text-2xl font-bold ">
              <p className="border-4 p-3 rounded-lg">{weatherInfo.main.temp.toFixed(2)} °C</p>
            </div>
            <div className="parameterContainer flex justify-evenly">
              <div className="parameter border-4 p-5 rounded-lg">
                <img src={windIcon} alt="Wind Speed" />
                <p>Wind Speed</p>
                <p className="parameterValue font-bold">{weatherInfo.wind.speed.toFixed(2)} m/s</p>
              </div>
              <div className="parameter border-4 mx-11 p-5 rounded-lg">
                <img src={humidityIcon} alt="Humidity" />
                <p>Humidity</p>
                <p className="parameterValue font-bold">{weatherInfo.main.humidity.toFixed(2)} %</p>
              </div>
              <div className="parameter border-4 p-5 rounded-lg">
                <img src={cloudIcon} alt="Clouds" />
                <p>Clouds</p>
                <p className="parameterValue font-bold">{weatherInfo.clouds.all.toFixed(2)} %</p>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="errorContainer subContainer">
            <img src={notFoundIcon} alt="Error" />
            <p>{error}</p>
            <button className="btn" onClick={() => setError(null)}>
              Retry Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
