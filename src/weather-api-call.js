export default async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ff959cd60bd81def53e946ffe7232d4b`, {mode: "cors"});
    const data = await response.json();
    console.log(data);
    return data;
}