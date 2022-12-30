import { celciusToFarenheight } from "./Data";

export default function Forecast({ forecastData, isCelcius }) {
  const nextDay = [forecastData.list.slice(0, 8)]
  const dayData = nextDay[0].map(day => {
    const time = new Date(day.dt * 1000);
    let temp = String((day.main.temp - 273.15).toFixed(2)) + " °C";
    if (!isCelcius) {
      temp = celciusToFarenheight(temp.slice(0, -3));
    }
    return {"time": time, "temp": temp};
  });
  // const dates = times.map(time => {
  //   const date = new Date(time * 1000);
  //   return date.toLocaleTimeString("en-US");
  // })
  console.log(dayData);
  console.log(dayData[0].time.toLocaleTimeString("en-US"))
}