import React, { useState } from "react";
import "../styles/weather.css";
import DisplayWeather from "./DisplayWeather";

const Weather = () => {
  const APIKey = "f2ddfd1c1973498d7be0986c081b574e";
  const [form, setForm] = useState({
    city: "",
    country: "",
  });
  const [weather, setWeather] = useState([]);

  const fetchData = async (e) => {
    e.preventDefault();

    if (form.city == "") {
      alert("Add city");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKey}`
      )
        .then((response) => response.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }

    if (name == "country") {
      setForm({ ...form, country: value });
    }
  };

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp; &nbsp;
        <input
          type="text"
          name="country"
          placeholder="country code"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => fetchData(e)}>
          Submit
        </button>
      </form>
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
