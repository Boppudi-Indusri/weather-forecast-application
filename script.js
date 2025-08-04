const API_KEY = "3d274ddf1782a01217dbc77e83763990"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const weatherInfo = document.getElementById("weatherInfo");
const forecastContainer = document.getElementById("forecast");
const recentCitiesDropdown = document.getElementById("recentCities");

// Fetch weather data by city
async function getWeatherByCity(city) {
  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const weatherData = await weatherRes.json();
    if (weatherData.cod !== 200) throw new Error(weatherData.message);

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();

    displayWeather(weatherData);
    displayForecast(forecastData);
    updateRecentCities(city);
  } catch (error) {
    weatherInfo.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    forecastContainer.innerHTML = "";
  }
}