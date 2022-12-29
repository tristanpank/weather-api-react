import { useState } from "react";
import getWeatherData from "../weatherApiCall";

export default function Input({ setWeatherData, setStatus, setForecastData }) {
  const [city, setCity] = useState("");
  const [displayCity, setDisplayCity] = useState("Input Location");
  // useEffect(() => {
  //   const fetchData = async (city) => {
  //     const weatherData = await getWeatherData(city);
  //     setWeatherData(weatherData);
  //   }
  //   fetchData(); 
  // }, [city, setWeatherData]);
  
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(city);
    setStatus("searching");
    const [weatherData, forecastData] = await getWeatherData(city);
    setWeatherData(weatherData);
    setForecastData(forecastData);
    setDisplayCity(weatherData.name);
    setStatus("found");
  }

  function handleInputChange(e) {
    setCity(e.target.value);
  }

  return (
    <>
      <div>{displayCity}</div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
