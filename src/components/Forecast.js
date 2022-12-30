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
      <label htmlFor="timezones" className="flex gap-2 text-base mb-5 flex-wrap">
        Choose a Timezone: 
        <select id="timezones" onChange={handleTimezoneChange}
        className="bg-slate-100 outline-none border-2 border-sky-800 rounded-md text-center focus:bg-slate-200
        transition-transform hover:scale-105 ease-in-out duration-200 shadow-md">
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
      <div className="flex flex-col items-center bg-sky-200 shadow-md border border-black p-1
      transition hover:scale-110 duration-200 hover:bg-sky-700 hover:text-white ease-in-out
      hover:border-2 rounded-md">
        <div>{day.temp}</div>
        <div>{timeSplit[0] + day.time.slice(-2)}</div>
      </div>
    );
  })

  return (
    <div className=" flex flex-col items-center">
      <TimezoneDropdown setTimezone={setTimezone} className="mb-4" />
      <div className=" font-bold text-2xl text-sky-800 mb-3">
        Forecast for the next 24 Hours
      </div>
      <div className="flex gap-3 items-center justify-center flex-wrap text-lg">
        {forecastBlock}
      </div>
    </div>
  )
}