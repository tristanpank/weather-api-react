export default async function getWeatherData(city) {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    const weatherData = await weatherResponse.json();
    // const locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    // const locationData = await locationResponse.json();
    // const location = {"lat": locationData[0].lat, "lon": locationData[0].lon};
    // console.log(location);
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    const forecastData = await forecastResponse.json();
    console.log(forecastData);
    return [weatherData, forecastData];
}