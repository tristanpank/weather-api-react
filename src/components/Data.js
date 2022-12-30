import { useState } from 'react'
import Forecast from './Forecast';

function celciusToFarenheight(temp) {
  temp = Number(temp.slice(0, -3));
  temp = (temp * (9/5) + 32).toFixed(2)
  return String(temp) + " °F";
}

function farenheightToCelcius(temp) {
  temp = Number(temp.slice(0, -3));
  temp = ((temp - 32) * (5/9)).toFixed(2);
  return String(temp) + " °C";
}

function TempToggle({ specificData, setSpecificData, isCelcius, setIsCelcius }) {
  
  function handleToggleClick() {
    setIsCelcius(!isCelcius);
    if (isCelcius) {
      setSpecificData({
        ...specificData,
        "temp": celciusToFarenheight(specificData.temp),
        "temp_min": celciusToFarenheight(specificData.temp_min),
        "temp_max": celciusToFarenheight(specificData.temp_max),
        "feels_like": celciusToFarenheight(specificData.feels_like),
      })
    } else {
      setSpecificData({
        ...specificData,
        "temp": farenheightToCelcius(specificData.temp),
        "temp_min": farenheightToCelcius(specificData.temp_min),
        "temp_max": farenheightToCelcius(specificData.temp_max),
        "feels_like": farenheightToCelcius(specificData.temp_max),
      })
    }
  }

  return (
    <form>
      <label>
        <input type="radio" checked={isCelcius && "checked"} onChange={handleToggleClick} />
        Celcius
      </label>
      <label>
        <input type="radio" checked={!isCelcius && "checked"} onChange={handleToggleClick} />
        Farenheight
      </label>
    </form>
  )
}

export default function Data({ weatherData, forecastData }) {
  const [specificData, setSpecificData] = useState(
    {
      "name": weatherData.name,
      "main": weatherData.main,
      "clouds": weatherData.clouds,
      "wind": weatherData.wind,
      "wind_speed": `${weatherData.wind.speed} m/s`,
      "temp": String((weatherData.main.temp - 273.15).toFixed(2)) + " °C",
      "temp_min": String((weatherData.main.temp_min - 273.15).toFixed(2)) + " °C",
      "temp_max": String((weatherData.main.temp_max - 273.15).toFixed(2)) + " °C",
      "humidity": `${weatherData.main.humidity}%`,
      "condition": weatherData.weather[0].main,
      "feels_like": String((weatherData.main.feels_like - 273.15).toFixed(2)) + " °C",
    });
  const [isCelcius, setIsCelcius] = useState(true);
  console.log(specificData);
  return (
    <div>
      <TempToggle specificData={specificData} setSpecificData={setSpecificData} isCelcius={isCelcius} setIsCelcius={setIsCelcius} />
      <div>Weather Breakdown</div>
      <div>{specificData.temp}</div>
      <div>
        <div>{specificData.condition}</div>
        <div>SVG</div>
      </div>
      <div>Humidity: {specificData.humidity}</div>
      <div>Wind Speed: {specificData.wind_speed}</div>
      <Forecast forecastData={forecastData} isCelcius={isCelcius} />
    </div>
  )
}

export { celciusToFarenheight, farenheightToCelcius }