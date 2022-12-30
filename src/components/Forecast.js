export default function Forecast({ forecastData }) {
  const nextDay = [forecastData.list.slice(0, 8)]
  const dayData = nextDay[0].map(day => {
    const time = new Date(day.dt * 1000);
    const temp = day.main.temp;
    return {"time": time, "temp": temp};
  });
  // const dates = times.map(time => {
  //   const date = new Date(time * 1000);
  //   return date.toLocaleTimeString("en-US");
  // })
  console.log(dayData);
  console.log(dayData[0].time.toLocaleTimeString("en-US"))
}