import { useState } from "react";
import getWeatherData from "../weatherApiCall";

export default function Input({ setWeatherData, setStatus, setForecastData, status, setMapURL }) {
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
    
    const [weatherData, forecastData, mapURL] = await getWeatherData(city);
    if (weatherData.cod === 200) {
      setWeatherData(weatherData);
      setForecastData(forecastData);
      setDisplayCity(weatherData.name);
      setMapURL(mapURL);
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
    <div className=" flex flex-col items-center p-5 gap-2">
      <div className="font-bold text-2xl" >{displayCity}</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        
        <input className={`border-2 ${(status === "error") ? "border-red-600" : "border-black"}
        rounded-md outline-none placeholder:italic placeholder:text-center pl-1`} onChange={handleInputChange} placeholder="Location" />
        
        <button type="submit" className=" bg-sky-800 text-white font-bold w-1/2 h-8 rounded-md hover:bg-sky-900 active:bg-blue-900 transition-transform ease-in-out delay-100 hover:scale-110 duration-200
        shadow-sm shadow-gray-400">Submit</button>
      </form>
    </div>
  );
}
