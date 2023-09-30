var inputEl = document.querySelector('#search-input');

// Test variables
var placeName = document.querySelector('#place-name');
var placeDate = document.querySelector('#place-date');
var placeTemp = document.querySelector('#place-temp');
var placeWind = document.querySelector('#place-wind');
var placeHumidity = document.querySelector('#place-humidity');

var userSearch = 'salt lake city';

// Create Array for days of the week
var weatherDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Get day
var day = new Date();
console.log("day", day)

var dayNum = day.getDay();
console.log("dayNum", dayNum)

var forecastDay = dayNum;

// Fetch API
function searchApi() {
    // var fetchURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&appid=6c3537dc7701b1d2d52795e48bb67bd3`

    var fetchURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userSearch + '&appid=6c3537dc7701b1d2d52795e48bb67bd3&units=imperial';
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
            
            // Loop through to get each day
            for (var i = 0; i < data.list.length; i++) {
                var time = data.list[i].dt_txt;

                if (time.includes('03:00:00')) {
                    forecastDay += 1;

                    // Reset to first item of array if equal to last item in array
                    if (forecastDay === 7) {
                        forecastDay = 0; 
                    }

                    placeName.textContent = data.city.name;
                    placeDate.textContent = weatherDay[forecastDay];
                    placeTemp.textContent = "Temp: " + data.list[forecastDay].main.temp + "ºF";
                    placeWind.textContent = "Wind:" + data.list[forecastDay].wind.speed + "MPH";
                    placeHumidity.textContent = "Humidity:" + data.list[forecastDay].main.humidity + "%";

                    console.log("time", time)
                    console.log(">date", placeDate.textContent)
                    console.log(">temp", placeTemp.textContent)
                    console.log(">wind", placeWind.textContent)
                    console.log(">hum", placeHumidity.textContent)

                }
            }
        }
    })
        .catch(function (error) {
            console.log(error);
        })
};

searchApi()

