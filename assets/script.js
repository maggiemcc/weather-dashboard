var inputEl = document.querySelector('#search-input');
var formEl = document.querySelector('#search-form');
var weatherEl = document.querySelector(".fiveDayWeather")

// var userSearch = 'salt lake city';

// Create Array for days of the week
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Get day
var day = new Date();
console.log("day", day)

var dayNum = day.getDay();
console.log("dayNum", dayNum)

var forecastDay = dayNum;

// Fetch API
function searchApi(userSearchVal) {
    var fetchURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userSearchVal + '&appid=6c3537dc7701b1d2d52795e48bb67bd3&units=imperial';
    console.log(fetchURL)

    fetch(fetchURL).then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    }).then(function (data) {
        console.log(data);

        if (!data.list.length) {
            console.log("no results");
        } else {

            var placeName = document.createElement("h3");
            placeName.textContent = data.city.name;

            // Loop through to get each day
            for (var i = 0; i < data.list.length; i++) {
                var time = data.list[i].dt_txt;

                if (time.includes('03:00:00')) {
                    forecastDay += 1;

                    // Reset to first item of array if equal to last item in array
                    if (forecastDay === 7) {
                        forecastDay = 0;
                    }

                    // CREATE ELEMENTS FOR EACH DAY/INFO
                    var weatherDay = document.createElement("div");
                    weatherDay.className = "weatherDay";
                    var placeDate = document.createElement("h3");
                    var placeTemp = document.createElement("h3");
                    var placeWind = document.createElement("h3");
                    var placeHumidity = document.createElement("h3");


                    placeDate.textContent = week[forecastDay];
                    placeTemp.textContent = "Temp: " + data.list[forecastDay].main.temp + "ºF";
                    placeWind.textContent = "Wind:" + data.list[forecastDay].wind.speed + "MPH";
                    placeHumidity.textContent = "Humidity:" + data.list[forecastDay].main.humidity + "%";


                    // APPEND ITEMS
                    weatherEl.appendChild(weatherDay);
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

function formSubmit(event) {
    event.preventDefault();

    var userSearchVal = document.querySelector('#search-input').value;
    if (!userSearchVal) {
        window.alert('You need a search input value!');
        return;
    }

    searchApi(userSearchVal);
}

formEl.addEventListener('submit', formSubmit);
