import { celciusToFarenheight } from "./Data";
import { useState } from "react";

function TimezoneDropdown({ setTimezone }) {
  const timezonesArray = [
    "Pacific/Midway",
    "Pacific/Honolulu",
    "America/Anchorage",
    "America/Los_Angeles",
    "America/Denver",
    "America/Chicago",
    "America/New_York",
    "America/Aruba",
    "America/Buenos_Aires",
    "Atlantic/Azores",
    "Europe/London",
    "Europe/Belgrade",
    "Europe/Helsinki",
    "Europe/Moscow",
    "Asia/Baku",
    "Asia/Karachi",
    "Asia/Dhaka",
    "Asia/Bangkok",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Pacific/Guadalcanal",
    "Pacific/Fiji",
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
          <option disabled selected value>Timezone</option>
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
  const forecastBlock = dayData.map(day => {
    const timeSplit = day.time.split(":");
    return (
      <div>
      <div>{day.temp}</div>
      <div>{timeSplit[0] + day.time.slice(-2)}</div>
      </div>
    );
  })

  return (
    <div>
      <TimezoneDropdown setTimezone={setTimezone} />
      <div>
        Forecast for the next 24 Hours
        {forecastBlock}
      </div>
    </div>
  )
}