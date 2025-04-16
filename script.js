let locationGetSuccess = (position) => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  getWeather(lat, lon);
};

let locationGetError = (error) => {
  console.error("Error getting location: ", error);
};

let getWeather = async (lat, lon) => {
  let apiKey = "9dbedfa13ab9000302a1d2f8c3a1c102";
  //   let city = "London";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  let data = await fetch(url);

  let weatherData = await data.json();
  console.log(weatherData);
};

async function Main() {
  navigator.geolocation.getCurrentPosition(
    locationGetSuccess,
    locationGetError
  );
}

Main();
