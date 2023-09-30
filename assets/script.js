var inputEl = document.querySelector('#search-input');
var formEl = document.querySelector('#search-form');
var weatherFiveDay = document.querySelector(".fiveDayWeather");
var weatherToday = document.querySelector(".display-today");

// Create Array for days of the week
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Get day
var day = new Date();
var dayNum = day.getDay();


// FETCH FIVE DAY FORECAST
function searchFiveDayApi(userSearchVal) {
    var fetchURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userSearchVal + '&appid=6c3537dc7701b1d2d52795e48bb67bd3&units=imperial';

    fetch(fetchURL).then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    }).then(function (data) {

        if (!data.list.length) {
            console.log("no results");
        } else {

            var forecastDay = dayNum;

            // LOOP THOUGH TO GET EACH DAY
            for (var i = 0; i < data.list.length; i++) {
                var time = data.list[i].dt_txt;

                if (time.includes('03:00:00')) {
                    // INSTEAD OF GRABING WEATHER FOR ONLY SATURDAY/FIRST FIVE OBJECTS, GETS ONE WEATHER OBJECT FOR EACH DAY
                    forecastDay += 1;

                    // Reset to first item of array if equal to last item in array
                    if (forecastDay === 7) {
                        forecastDay = 0;
                    }

                    // CREATE ELEMENTS FOR EACH DAY/INFO & ADD TEXT CONTENT
                    var weatherDay = document.createElement("div");
                    weatherDay.className = "weatherDay";

                    var weatherIcon = document.createElement('img');
                    var placeDate = document.createElement("h4");
                    var placeTemp = document.createElement("h4");
                    var placeWind = document.createElement("h4");
                    var placeHumidity = document.createElement("h4");


                    var iconCode = data.list[forecastDay].weather[0].icon;
                    var iconPath = "//openweathermap.org/img/w/" + iconCode + ".png";
                    weatherIcon.src = iconPath;
                    placeDate.textContent = week[forecastDay].toUpperCase();
                    placeTemp.textContent = "Temp: " + data.list[forecastDay].main.temp + "ºF";
                    placeWind.textContent = "Wind: " + data.list[forecastDay].wind.speed + " MPH";
                    placeHumidity.textContent = "Humidity: " + data.list[forecastDay].main.humidity + "%";


                    // APPEND ITEMS
                    weatherFiveDay.appendChild(weatherDay);
                    weatherDay.appendChild(weatherIcon);
                    weatherDay.appendChild(placeDate);
                    weatherDay.appendChild(placeTemp);
                    weatherDay.appendChild(placeWind);
                    weatherDay.appendChild(placeHumidity);

                }
            }
        }
    })
        .catch(function (error) {
            console.log(error);
        })
};

// FETCH TODAYS WEATHER
function searchTodayApi(userSearchVal) {
    var fetchURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userSearchVal + '&appid=6c3537dc7701b1d2d52795e48bb67bd3&units=imperial';

    fetch(fetchURL).then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    }).then(function (data) {

        if (!data.weather.length) {
            console.log("no results");
        } else {
            // CREATE ELEMENTS
            var placeName = document.createElement("h2");
            placeName.textContent = data.name;

            var weatherIcon = document.createElement('img');
            var iconCode = data.weather[0].icon;
            var iconPath = "//openweathermap.org/img/w/" + iconCode + ".png";
            weatherIcon.src = iconPath;

            var placeTemp = document.createElement("h3");
            placeTemp.textContent = "Temp: " + data.main.temp + "ºF";

            var placeWind = document.createElement("h3");
            placeWind.textContent = "Wind: " + data.wind.speed + " MPH";

            var placeHumidity = document.createElement("h3");
            placeHumidity.textContent = "Humidity: " + data.main.humidity + "%";


            // APPEND ITEMS
            weatherToday.appendChild(placeName);
            weatherToday.appendChild(weatherIcon);
            weatherToday.appendChild(placeTemp);
            weatherToday.appendChild(placeWind);
            weatherToday.appendChild(placeHumidity);
        }
    })
        .catch(function (error) {
            console.log(error);
        })

};

function formSubmit(event) {
    event.preventDefault();

    var userSearchVal = document.querySelector('#search-input').value;
    if (!userSearchVal) {
        window.alert('You need a search input value!');
        return;
    }

    weatherFiveDay.innerHTML = " ";
    weatherToday.innerHTML = " ";
    searchFiveDayApi(userSearchVal);
    searchTodayApi(userSearchVal);
}

formEl.addEventListener('submit', formSubmit);