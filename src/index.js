function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let min = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  let fullDate = `${day} ${hours}:${min}`;
  return fullDate;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-input");
  let h1 = document.querySelector("#your-city");
  let city = cityInput.value;
  if (city) {
    h1.innerHTML = `${city}`;
    searchCity(city);
  } else {
    h1.innerHTML = null;
    alert("No city given");
  }
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "0401d75eba16100d78dca41d3674fcdc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let h1 = document.querySelector("#your-city");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let showCelsius = `${temperature}°C`;
  let h2 = document.querySelector(".temp");
  h2.innerHTML = showCelsius;
  let showDescription = `${description}`;
  let h4 = document.querySelector("#condition");
  h4.innerHTML = showDescription;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "0401d75eba16100d78dca41d3674fcdc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let currentDate = document.querySelector("h3.date");
currentDate.innerHTML = formatDate();

let formCity = document.querySelector("#enter-city");
formCity.addEventListener("submit", handleSubmit);

let myLocationButton = document.querySelector("#current-location");
myLocationButton.addEventListener("click", getPosition);
