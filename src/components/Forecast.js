import { celciusToFarenheight } from "./Data";
import { useState } from "react";

function TimezoneDropdown({ setTimezone }) {
  const timezonesArray = [
    "IDLW",
    "NT",
    "HST",
    "AKST",
    "PST",
    "MST",
    "CST",
    "EST",
    "AST",
    "ART",
    "AT",
    "WAT",
    "GMT",
    "CET",
    "EET",
    "MSK",
    "AMT",
    "PKT",
    "OMSK",
    "KRAT",
    "JST",
    "AEST",
    "SAKT",
    "NZST",
  ]
  const selectTimezoneItems = timezonesArray.map(timezone => <option value={timezone} key={timezone}>{timezone}</option>)

  function handleTimezoneChange(e) {
    setTimezone(e.target.value);
  }

  return (
    <form>
      <label htmlFor="timezones">
        Choose a Timezone: 
        <select id="timezones" onChange={handleTimezoneChange}>
          {selectTimezoneItems}
        </select>
      </label>
    </form>
  )
}


export default function Forecast({ forecastData, isCelcius }) {
  const [timezone, setTimezone] = useState(null);
  // Take forecast data and extracts first 8 intervals (1 day)
  // Converts to object with just time and temp
  const nextDay = [forecastData.list.slice(0, 8)]
  const dayData = nextDay[0].map(day => {
    let time = new Date(day.dt * 1000);
    let temp = String((day.main.temp - 273.15).toFixed(2)) + " °C";
    if (!isCelcius) {
      temp = celciusToFarenheight(temp.slice(0, -3));
    }
    if (timezone !== null) {
      time = time.toLocaleTimeString("GMT", {timeZone: timezone});
    } else {
      time = time.toLocaleTimeString();
    }
    return {"time": time, "temp": temp};
  });
  // const dates = times.map(time => {
  //   const date = new Date(time * 1000);
  //   return date.toLocaleTimeString("en-US");
  // })
  console.log(dayData);
  // console.log(dayData[0].time.toLocaleTimeString("GMT", {timeZone: "MST"}))

  return (
    <TimezoneDropdown setTimezone={setTimezone} />
  )
}