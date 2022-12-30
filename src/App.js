import { useState } from "react";
import Data from "./components/Data";
import Header from "./components/Header";
import Input from "./components/Input";
import gif from './assests/hug.gif'


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [mapURL, setMapURL] = useState(null);
  const [status, setStatus] = useState("initial");
  console.log(forecastData);
  return (
  <div className=" bg-sky-100 h-screen flex flex-col w-screen justify-start place-items-center">
    <Header />
    <Input setWeatherData={setWeatherData} setStatus={setStatus} setForecastData={setForecastData} status={status} setMapURL={setMapURL} />
    {(status === "searching") && <img src={gif} alt="searching" className=" h-1/4 w-1/4 items-center" />}
    {(status === "found") && 
    <>
    <Data weatherData={weatherData} forecastData={forecastData} mapURL={mapURL} />
    </>
    }
  </div>
  )
};

export default App;
