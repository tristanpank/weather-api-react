import { useState } from "react";
import Header from "./components/Header";
import Input from "./components/Input";


function App() {
  const [weatherData, setWeatherData] = useState({});

  return (
  <>
    <Header />
    <Input setWeatherData={setWeatherData} />
    <div>
      {weatherData.name}
    </div>
  </>
  )
};

export default App;
