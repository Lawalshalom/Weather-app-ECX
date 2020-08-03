import React, { useState, useEffect } from 'react';
import "./App.css";

  const App = () => {
    const [city, setCity] = useState("");
    const [ipCity, setIpCity] = useState("");
    const [position, setPosition] = useState({lat: "", long: ""})
    let latitude, longitude;

    //data visualizations
    const weatherData = (predata, data) => {
      const weatherDiv = document.querySelector(".weatherDiv");
      const time = new Date();
      time.setTime(Date.now());
      const { visibility } = data.current;
      const { wind_deg, wind_speed } = data.current;
      const sunrise = new Date(0);
      sunrise.setUTCSeconds(data.daily[0].sunrise);
      const sunset = new Date(0);
      sunset.setUTCSeconds(data.daily[0].sunset);
      const { description } = data.current.weather[0];
      const { temp, feels_like, humidity, pressure } = data.current;
      weatherDiv.style.display = "block";
      weatherDiv.innerHTML = `
      <div className="weatherDetails">
      <h3 class="text-center"><strong>Weather Today For ${predata.name}, ${predata.sys.country}</strong> </h3>
      <p>Timezone: ${data.timezone} </p>
      <p><i class="fa fa-clock-o" aria-hidden="true"></i>
      Current Time: ${time}</p>
      <p>Description: ${description} </p>
      <p><i class="fa fa-sun-o" aria-hidden="true"></i>  Temperature: ${(temp -273).toFixed(2)} &#8451;</p>
      <p><svg width="24px" viewBox="0 0 24 24"><path d="M10.333 15.48v.321c.971.357 1.667 1.322 1.667 2.456 0 1.438-1.12 2.604-2.5 2.604S7 19.695 7 18.257c0-1.134.696-2.099 1.667-2.456v-.322a2.084 2.084 0 0 1-1.25-1.91V5.583a2.083 2.083 0 1 1 4.166 0v7.986c0 .855-.514 1.589-1.25 1.91zM15.8 8.1a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zm0-1.85a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
      Feels like: ${(feels_like -273).toFixed(2)} &#8451;</p>
      <p><i class="fa fa-upload" aria-hidden="true"></i>
      Sunrise: ${sunrise.toLocaleTimeString()}</p>
      <p><i class="fa fa-download" aria-hidden="true"></i>
      Sunset: ${sunset.toLocaleTimeString()}</p>
      <p>
      <svg width="24px" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11.743 17.912a4.182 4.182 0 0 1-2.928-1.182 3.972 3.972 0 0 1-.614-4.962.743.743 0 0 1 .646-.349c.234 0 .476.095.66.275l4.467 4.355c.385.376.39.998-.076 1.275a4.216 4.216 0 0 1-2.155.588M11.855 4c.316 0 .61.14.828.395.171.2.36.416.562.647 1.857 2.126 4.965 5.684 4.965 8.73 0 3.416-2.85 6.195-6.353 6.195-3.505 0-6.357-2.78-6.357-6.195 0-3.082 2.921-6.406 4.854-8.605.242-.275.47-.535.673-.772A1.08 1.08 0 0 1 11.855 4"></path></svg>
      Humidity: ${humidity} </p>
      <p><svg width="24px" viewBox="0 0 24 24"><path d="M6 8.67h5.354c1.457 0 2.234-1.158 2.234-2.222S12.687 4.4 11.354 4.4c-.564 0-1.023.208-1.366.488M3 11.67h15.54c1.457 0 2.235-1.158 2.235-2.222S19.873 7.4 18.54 7.4c-.747 0-1.311.365-1.663.78M6 15.4h9.389c1.457 0 2.234 1.159 2.234 2.223 0 1.064-.901 2.048-2.234 2.048a2.153 2.153 0 0 1-1.63-.742" stroke-width="2" stroke="currentColor" stroke-linecap="round" fill="none"></path></svg>
      Wind speed: ${wind_speed}</p>
      <p><i class="fa fa-angle-double-right" aria-hidden="true"></i><i class="fa fa-angle-double-right" aria-hidden="true"></i>
      Wind degree: ${wind_deg}</p>
      <p><svg width="24px" viewBox="0 0 24 24"><path d="M8.462 18.293l-.29-.002c-.6-.004-1.043-.007-1.259-.007-1.119 0-1.182-1.015-.34-1.734l.196-.164.508-.425 1.543-1.292c1.014-.846 1.74-1.45 2.073-1.723.735-.601 1.305-.596 2.033.022.387.329.959.805 2.207 1.841a377.936 377.936 0 0 1 2.18 1.816c.796.67.742 1.66-.295 1.66h-2.382v1.77c0 .83-.393 1.223-1.258 1.223h-2.994c-.809 0-1.258-.42-1.258-1.207v-1.773l-.664-.005zm0-12.807l-.29.002c-.6.004-1.043.006-1.259.006-1.119 0-1.182 1.016-.34 1.734l.196.164.508.426 1.543 1.29a348.68 348.68 0 0 0 2.073 1.724c.735.601 1.305.596 2.033-.022.387-.328.959-.805 2.207-1.84a377.937 377.937 0 0 0 2.18-1.817c.796-.67.742-1.659-.295-1.659h-2.382v-1.77c0-.832-.393-1.224-1.258-1.224h-2.994c-.809 0-1.258.42-1.258 1.207V5.48l-.664.005z"></path></svg>
      Pressure: ${pressure}hPa</p>
      <p><i class="fa fa-low-vision" aria-hidden="true"></i>  Visibility: ${visibility}</p>
      </div>
      `;
    }

    useEffect(() => {
      //get ip city on mount
      async function fetchIpCity() {
        const res = await fetch ("https://ipapi.co/json/");
        const data = await res.json();
        setIpCity(data.city);
        setPosition({lat: data.latitude, long: data.longitude})
        const showCityWeatherBtn = document.getElementById("ipAddressBtn");
        showCityWeatherBtn.style.display = "block";
      }
      fetchIpCity();
    }, [ipCity]);


  //display ip's City weather stats
  const getWeatherByIpCityName = () => {
     async function fetchCityWeather() {
      const firstres = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.long}&appid=7b7f7b7feaf35626b45b57666f76dcde`);
      const predata = await firstres.json();
       const res = await fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.long}&exclude=minutely&appid=7b7f7b7feaf35626b45b57666f76dcde`);
       const data = await res.json();
        weatherData(predata, data);
  }

  fetchCityWeather().catch(err => {
    const weatherDiv = document.querySelector(".weatherDiv");
    weatherDiv.style.display = "block";
    weatherDiv.innerHTML = "Error fetching weather";
    console.log(err)
    });
       }


    //get location by geolocation
    const getGeolocation = () => {
      const geolocationDiv = document.querySelector(".geolocationDiv");
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
          } else {
          geolocationDiv.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    function showPosition(position) {
      const button = document.getElementById("geolocationbtn");
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      geolocationDiv.innerHTML = `Your current location is <br/>
      Latitude: ${latitude} <br/>
      Longitude: ${longitude}`;
        button.style.display = "block";
      }
      getLocation();
    }

  //display geolocation weather stats
  const getWeatherByGeolocation = () => {
    const weatherDiv = document.querySelector(".weatherDiv");
     async function fetchWeather() {
       const firstres = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7b7f7b7feaf35626b45b57666f76dcde`);
       const predata = await firstres.json();
       const res = await fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&
       exclude=minutely&appid=7b7f7b7feaf35626b45b57666f76dcde`);
       const data = await res.json();
       weatherData(predata, data);
      }
     fetchWeather().catch(err => {
      weatherDiv.style.display = "block";
      weatherDiv.innerHTML = "Error fetching weather";
      console.log(err)
    });
  }

  //display search city weather stats
  const getWeatherBySearchName = () => {
    const weatherDiv = document.querySelector(".weatherDiv");
     async function fetchSearchNameWeather() {
       const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b7f7b7feaf35626b45b57666f76dcde`);
       const predata = await res.json();
       const time = new Date();
       time.setTime(Date.now());
       const { lat, lon } = predata.coord;

       async function finalSearchNameWeather(a, b) {
         const finalres = await fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${a}&lon=${b}&exclude=minutely&appid=7b7f7b7feaf35626b45b57666f76dcde`);
         const data = await finalres.json();
         weatherData(predata, data);
       }
       finalSearchNameWeather(lat, lon);
     }
     fetchSearchNameWeather().catch(err => {
      weatherDiv.style.display = "block";
      weatherDiv.innerHTML = "Error fetching weather, check city spelling";
      console.log(err)
    });
  }
    return (
    <div className="container home center">
      <h1 className="text-center"><i className="fa fa-sun-o" aria-hidden="true"></i><strong>Weather App</strong></h1>
    <div className="homeImg"></div>
  <div className="ip center">
  <p>Your location via your ip address is {ipCity}</p>
  <button id="ipAddressBtn" className="myBtn" onClick={getWeatherByIpCityName}>Get Weather Forecast</button>
  </div>

  <div className="geolocation center">
    <p>Or click <button className="myBtn" onClick={getGeolocation}>
      Here</button> to allow geolocation detect your current location</p>
      <div className="geolocationDiv"></div>
    <button id="geolocationbtn" className="myBtn" onClick={getWeatherByGeolocation}>Get Weather Forecast</button>
  </div>
  <div className="search">
    <p>Or enter your city name here:</p>
        <input type="name" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City Name"
          required autoComplete="true" autoFocus minLength="3" pattern="/[a-zA-Z]+/" />
      <button id="citySearch" className="myBtn" onClick={getWeatherBySearchName}>Submit</button>
      </div>
    <div id="weatherData">
        <div className="weatherDiv"></div>
        <div id="hourlyChart"></div>
        <div id="dailyChart"></div>
    </div>

  <footer>Made by lawalshalom &copy;2020</footer>
  </div>
  )
}
export default App;