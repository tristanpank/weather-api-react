import { useState } from "react";
import getWeatherData from "../weatherApiCall";

export default function Input({ setWeatherData }) {
  const [city, setCity] = useState("");
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
    const weatherData = await getWeatherData(city);
    setWeatherData(weatherData);
  }

  function handleInputChange(e) {
    setCity(e.target.value);
  }

  return (
    <>
      <div>{city}</div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
