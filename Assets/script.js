var searchField = document.getElementById("inlineFormInputGroupUsername");
var geocode =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  citySearch +
  "&appid=68c2e84e6eaae16993d990cb419c8eb3&units=imperial";
var citySearch = searchField.value;
var searchForm = document.getElementById("search-form");
console.log(citySearch);
var conditions = document.getElementById("conditions");
var today = dayjs();
var formattedDate = today.format("MMM DD, YYYY");
var todayDateEl = document.getElementById("todayDate");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  conditions.innerHTML = "";
  todayDateEl.textContent = formattedDate;
  citySearch = searchField.value;
  geocode =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchField.value +
    "&appid=68c2e84e6eaae16993d990cb419c8eb3&units=imperial";
  console.log(citySearch);
  console.log(geocode);
  fetch(geocode)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var tempLi = document.createElement("li");
      var windLi = document.createElement("li");
      var humidityLi = document.createElement("li");
      var cityNameh1 = document.createElement("h1");
      cityNameh1.textContent = data.name;
      tempLi.textContent = "temperature: " + data.main.temp + "°F";
      windLi.textContent = "wind speed: " + data.wind.speed + "MPH";
      humidityLi.textContent = "Humidity: " + data.main.humidity + "%";
      conditions.appendChild(cityNameh1);
      conditions.appendChild(tempLi);
      conditions.appendChild(windLi);
      conditions.appendChild(humidityLi);
    });
});
