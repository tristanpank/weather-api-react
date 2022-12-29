import { useState } from "react";
import Data from "./components/Data";
import Header from "./components/Header";
import Input from "./components/Input";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState("initial");

  return (
  <>
    <Header />
    <Input setWeatherData={setWeatherData} setStatus={setStatus}/>
    {(status === "searching") && <div>Searching</div>}
    {(status === "found") && <Data weatherData={weatherData} />}
  </>
  )
};

export default App;
