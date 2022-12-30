import { useState } from "react";
import getWeatherData from "../weatherApiCall";

export default function Input({ setWeatherData, setStatus, setForecastData, status }) {
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
    if (weatherData.cod === 200) {
      setWeatherData(weatherData);
      setForecastData(forecastData);
      setDisplayCity(weatherData.name);
      setStatus("found");
    } else {
      setWeatherData(null);
      setForecastData(null);
      setDisplayCity("Invalid Location");
      setStatus("error");
      console.log('found error');
    }
  }

  function handleInputChange(e) {
    setCity(e.target.value);
  }

  return (
    <>
      <div className="font-bold text-green-300 text-lg" >{displayCity}</div>
      <form onSubmit={handleSubmit}>
        <input className=" border-green-300 placeholder:italic text-blue-500" onChange={handleInputChange} placeholder="Location" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
