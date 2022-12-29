import { useState, useEffect } from "react";
import getWeatherData from "./weatherApiCall";
import Header from "./components/header";


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
  <>
    <Header />
    <div>
      {weatherData.name}
    </div>
  </>
  )
};

export default App;
