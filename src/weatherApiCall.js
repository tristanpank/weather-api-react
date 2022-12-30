export default async function getWeatherData(city) {
  
  try {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    const weatherData = await weatherResponse.json();
    // const locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    // const locationData = await locationResponse.json();
    // const location = {"lat": locationData[0].lat, "lon": locationData[0].lon};
    // console.log(location);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    const forecastData = await forecastResponse.json();
    console.log(forecastData);
    console.log(weatherData);
    const mapResponse = await fetch(`https://tile.openweathermap.org/map/temp_new/2/${"1"}/${"1"}.png?appid=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"})
    const mapData = await mapResponse.blob();
    const mapURL = await URL.createObjectURL(mapData);
    console.log(mapResponse);
    console.log(mapData);
    return [weatherData, forecastData, mapURL];
  } catch(err) {
    return ['err', 'err'];
  }
}