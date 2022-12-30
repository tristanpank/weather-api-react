import { useState } from "react";
import Data from "./components/Data";
import Header from "./components/Header";
import Input from "./components/Input";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [status, setStatus] = useState("initial");
  console.log(forecastData);
  return (
  <div className=" bg-sky-100 h-screen">
    <Header />
    <Input setWeatherData={setWeatherData} setStatus={setStatus} setForecastData={setForecastData} status={status} />
    {(status === "searching") && <div>Searching</div>}
    {(status === "found") && 
    <>
    <Data weatherData={weatherData} forecastData={forecastData} />
    </>
    }
  </div>
  )
};

export default App;
