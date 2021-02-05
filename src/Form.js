import React, { useState } from "react";
import axios from "axios";

export default function Form() {
  let [city, setCity] = useState(" ");
  let [info, setInfo] = useState(" ");

  function showDetails(response) {
    let imgUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    setInfo(
      <ul>
        <li>Temperature : {Math.round(response.data.main.temp)}°C</li>
        <li>Description : {response.data.weather[0].description}</li>
        <li>Humidity : {response.data.main.humidity} %</li>
        <li>wind : {Math.round(response.data.wind.speed)} km/hr </li>
        <li>
          <img src={imgUrl} alt="weather description" />
        </li>
      </ul>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=81a39b8b4f83887f2094935f304faa2f&units=imperial`;

    axios.get(url).then(showDetails);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" class="text " onChange={updateCity} />
        <input type="submit" value="search" />
      </form>
      <h6>{info}</h6>
    </div>
  );
}
