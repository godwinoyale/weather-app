import "../WeatherApp/WeatherApp.css";
import search_icon from "../Asset/search.png";
import clear_icon from "../Asset/clear.png";
import cloud_icon from "../Asset/cloud.png";
import drizzle_icon from "../Asset/drizzle.png";
import humidity_icon from "../Asset/humidity.png";
import rain_icon from "../Asset/rain.png";
import snow_icon from "../Asset/snow.png";
import wind_icon from "../Asset/wind.png";
import { useState } from "react";

export const WeatherApp = () => {

  let api_key = "1d688d13dc5b49af181077deb488573a";
  const [wicon, setWicon] = useState(cloud_icon)

  const search = async () => {
    const element = document.getElementsByClassName("city")

    if(element[0].value===""){
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

    let response = await fetch(url);
    let data = await response.json();
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const country = document.getElementsByClassName("country-location");
    
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    country[0].innerHTML = data.sys.country

    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
        setWicon(clear_icon)
    }
    else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
      setWicon(cloud_icon)
    }else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
      setWicon(drizzle_icon)
    } else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
      setWicon(drizzle_icon)
    }else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
      setWicon(rain_icon)
    }else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
      setWicon(rain_icon)
    }else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
      setWicon(snow_icon)
    }else{
      setWicon(clear_icon)
    }

  }

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="city" placeholder="Search" />
        <div className="search_icon" onClick={() => {search()}} >
          <img src={search_icon} alt="search-icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="cloud icon" />
      </div>
      <div className="weather-temp">
        9<sup>0</sup>C
      </div>
      <div className="weather-location">London</div>
      <div className="country-location">GB</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} className="icon" alt="" />
          <div className="data">
            <div className="humidity-percent">65%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} className="icon" alt="" />
          <div className="data">
            <div className="wind-rate">20km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
