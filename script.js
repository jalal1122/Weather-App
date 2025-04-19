let locationName = document.querySelector(".locationName");

let monthDate = document.querySelector(".monthDate");

let day = document.querySelector(".day");

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let temp = document.querySelector(".temp");

let feelsLike = document.querySelector(".feelsLike");

let weatherIcon = document.querySelector(".weather-icon");

let weatherDescription = document.querySelector(".weatherDescription");

let sunriseTime = document.querySelector(".sunriseTime");

let sunsetTime = document.querySelector(".sunsetTime");

let humidityLevel = document.querySelector(".humidityLevel");

let windSpeed = document.querySelector(".windSpeed");

let locationGetSuccess = async (position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  await getWeather(lat, lon);
};

let locationGetError = (error) => {
  console.error("Error getting location: ", error);
};

let getWeather = async (lat, lon) => {
  let apiKey = "9dbedfa13ab9000302a1d2f8c3a1c102";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  let data = await fetch(url);

  let weatherData = await data.json();

  console.log(weatherData);

  locationName.textContent = weatherData.name;

  let time = new Date();
  let date = time.getDate();
  let month = months[time.getMonth()];
  let day = days[time.getDay()];
  monthDate.textContent = `${month} ${date}`;

  day.textContent = `${day}`;

  temp.textContent = `${Math.floor(weatherData.main.temp)}° C`;

  feelsLike.textContent = `Feels like ${Math.floor(
    weatherData.main.feels_like
  )}° C`;

  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

  weatherDescription.textContent = weatherData.weather[0].description;

  sunriseTime.textContent = `${getSunriseSunset(weatherData.sys.sunrise,weatherData.sys.sunset).formatedSunrise} AM`

  sunsetTime.textContent = `${getSunriseSunset(weatherData.sys.sunrise,weatherData.sys.sunset).formatedSunset} PM`

  humidityLevel.textContent = `${weatherData.main.humidity}%`;

  windSpeed.textContent = `${weatherData.wind.speed} m/s`;
};

function getSunriseSunset(sunriseTimeStamp,sunsetTimeStamp){
  let sunrise = new Date(sunriseTimeStamp * 1000)

  let sunset = new Date(sunsetTimeStamp * 1000)

  let formatedSunrise = `${sunrise.getHours()} : ${sunrise.getMinutes()}`
  let formatedSunset = `${sunset.getHours() - 12} : ${sunset.getMinutes()}`

  return {formatedSunrise,formatedSunset}
}

async function Main() {
  navigator.geolocation.getCurrentPosition(
    locationGetSuccess,
    locationGetError
  );
}

Main();
