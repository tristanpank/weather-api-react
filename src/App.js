import { useState, useEffect } from "react";
import getWeatherData from "./weather-api-call";


function App() {
  const [weatherData, setWeatherData] = useState({});
  useEffect(() => {
    const fetchData = async() => {
      const data = await getWeatherData("ocala");
      setWeatherData(data);
    };
    fetchData();
  }, []);

  return (
  <div>
    {weatherData.name}
  </div>
  )
};

export default App;
