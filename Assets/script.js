var searchField = document.getElementById("inlineFormInputGroupUsername");
var searchBtn = document.getElementById("search");
var headEl = document.getElementById("head");
var geocode =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  citySearch +
  "&appid=68c2e84e6eaae16993d990cb419c8eb3&units=imperial";
console.log(geocode);
var card = document.getElementById("card");
var citySearch = searchField.value;
var searchForm = document.getElementById("search-form");
console.log(citySearch);
var conditions = document.getElementById("conditions");
var today = dayjs();
var formattedDate = today.format("MMM DD, YYYY");
var todayDateEl = document.getElementById("todayDate");
var long = "";
var lat = "";
var citySave = JSON.parse(localStorage.getItem("city")) || [];
var cityList = document.getElementById("city-btn");

function searchHandler(event) {
  event.preventDefault();
  conditions.textContent = "";
  todayDateEl.textContent = formattedDate;
  citySearch = searchField.value;
  var cityName = event.target.textContent.split(" ")[0].trim();
  var newSearch = false;
  if (cityName === "") {
    cityName = searchField.value;
    newSearch = true;
  } else {
    cityName = event.target.textContent;
  }
  console.log(cityName);
  geocode =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=68c2e84e6eaae16993d990cb419c8eb3&units=imperial";
  console.log(citySearch);
  console.log(geocode);
  fetch(geocode)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      long = data.coord.lon;
      lat = data.coord.lat;
      var fiveDay =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=68c2e84e6eaae16993d990cb419c8eb3&units=imperial";
      var tempLi = document.createElement("li");
      var windLi = document.createElement("li");
      var humidityLi = document.createElement("li");
      var cityNameh1 = document.createElement("h1");
      var makeIcon = document.createElement("img");
      makeIcon.setAttribute("width", "50px");
      makeIcon.setAttribute("height", "50px");
      makeIcon.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      cityNameh1.textContent = data.name;
      todayDateEl.appendChild(makeIcon);
      tempLi.textContent = "temperature: " + data.main.temp + "°F";
      windLi.textContent = "wind speed: " + data.wind.speed + "MPH";
      humidityLi.textContent = "Humidity: " + data.main.humidity + "%";
      conditions.appendChild(cityNameh1);
      conditions.appendChild(tempLi);
      conditions.appendChild(windLi);
      conditions.appendChild(humidityLi);

      fetch(fiveDay)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          headEl.innerHTML = "";
          var header = document.createElement("h2");
          header.textContent = "Five Day Forecast";
          headEl.appendChild(header);
          headEl.classList.add("d-flex", "justify-content-center");
          card.innerHTML = "";

          for (i = 5; i < data.list.length; i += 8) {
            var fiveDayCard = document.createElement("div");
            fiveDayCard.classList.add(
              "card",
              "col-12",
              "col-md-8",
              "col-lg-8",
              "rounded"
            );
            var fiveDayIcon = document.createElement("img");
            fiveDayIcon.setAttribute(
              "src",
              "https://openweathermap.org/img/wn/" +
                data.list[i].weather[0].icon +
                "@2x.png"
            );
            fiveDayIcon.setAttribute("width", "40px");
            fiveDayIcon.setAttribute("height", "40px");
            console.log(fiveDayIcon);
            fiveDayCard.appendChild(fiveDayIcon);
            var cardBody = document.createElement("div");
            cardBody.appendChild(fiveDayCard);
            var title = document.createElement("h3");
            title.textContent = data.list[i].dt_txt;
            fiveDayCard.appendChild(title);
            card.appendChild(cardBody);
            var pEl = document.createElement("h5");
            pEl.textContent = data.list[i].main.temp + "°F";
            fiveDayCard.appendChild(pEl);
            console.log(fiveDayCard);
            pEl.appendChild(fiveDayIcon);
            var cardArr = [];
            cardArr.push(fiveDayCard);
            if (cardArr.length >= 5) {
              card.remove(fiveDayCard);
            }
          }
        });

      if (newSearch) {
        citySave.push(citySearch);
        console.log(citySave);
        localStorage.setItem("city", JSON.stringify(citySave));
        showCity();
      }
    });
}

function showCity() {
  var cityList = JSON.parse(localStorage.getItem("city"));
  console.log(cityList);

  var ulBtn = document.getElementById("city-btn");

  for (var i = 0; i < cityList.length; i++) {
    var cityName = cityList[i];

    if (!isCityInList(cityName, ulBtn)) {
      var searchedCity = document.createElement("button");
      searchedCity.textContent = cityName;
      var history = "history-btn" + i;
      searchedCity.setAttribute("id", history);
      ulBtn.appendChild(searchedCity);

      var searchEl = document.getElementById(history);
      searchEl.addEventListener("click", searchHandler);
    }
  }
}
function isCityInList(cityName, cityList) {
  var existingButtons = cityList.getElementsByTagName("button");
  for (var i = 0; i < existingButtons.length; i++) {
    if (existingButtons[i].textContent === cityName) {
      return true;
    }
  }
  return false;
}

searchForm.addEventListener("submit", searchHandler);
function init() {
  showCity();
}
init();
