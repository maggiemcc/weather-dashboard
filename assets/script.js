var inputEl = document.querySelector('#search-input');
var formEl = document.querySelector('#search-form');
var clearHistory = document.querySelector('.clearBtn');
var weatherFiveDay = document.querySelector(".fiveDayWeather");
var weatherToday = document.querySelector(".currentDayWeather");
var placesSearched = document.querySelector('.places-searched')

// Get day
var currentDay = dayjs().format("dddd: MMMM DD, YYYY");

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

            // LOOP THOUGH TO GET EACH DAY
            for (var i = 0; i < data.list.length; i++) {
                var time = data.list[i].dt_txt;

                // INSTEAD OF GRABING WEATHER FOR ONLY SATURDAY/FIRST FIVE OBJECTS, GETS ONE WEATHER OBJECT FOR EACH DAY for 3:00
                if (time.includes('03:00:00')) {

                    // CREATE ELEMENTS FOR EACH DAY/INFO & ADD TEXT CONTENT
                    var weatherDay = document.createElement("div");
                    weatherDay.className = "weatherDay";

                    var placeWeekday = document.createElement("h4");
                    placeWeekday.textContent = dayjs(data.list[i].dt_txt.slice(0, 10)).format('dddd: MMM DD, YYYY');;

                    var weatherIcon = document.createElement('img');
                    var iconCode = data.list[i].weather[0].icon;
                    var iconPath = "//openweathermap.org/img/w/" + iconCode + ".png";
                    weatherIcon.src = iconPath;

                    var placeTemp = document.createElement("h4");
                    placeTemp.textContent = "Temp: " + data.list[i].main.temp + "ºF";

                    var placeWind = document.createElement("h4");
                    placeWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";

                    var placeHumidity = document.createElement("h4");
                    placeHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";


                    // APPEND ITEMS
                    weatherFiveDay.appendChild(weatherDay);
                    weatherDay.appendChild(placeWeekday);
                    weatherDay.appendChild(weatherIcon);
                    weatherDay.appendChild(placeTemp);
                    weatherDay.appendChild(placeWind);
                    weatherDay.appendChild(placeHumidity);

                }
            }
        }
    })
        .catch(function (error) {
            console.log(error);
            alert(`try again, couldn't find ${userSearchVal}`);
            window.location.reload();
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
        } else {
            // CREATE ELEMENTS
            var placeName = document.createElement("h2");
            placeName.textContent = data.name;
            var placeDate = document.createElement("h2");
            placeDate.textContent = currentDay;

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
            weatherToday.appendChild(placeDate);
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

// FORM SUBMIT/CREATE LOCALSTORAGE
function formSubmit(event) {
    event.preventDefault();

    var userSearchVal = document.querySelector('#search-input').value.toLowerCase();
    if (!userSearchVal) {
        window.alert('You need a search input value!');
        return;
    }
    weatherFiveDay.innerHTML = "";
    weatherToday.innerHTML = "";
    document.querySelector('#search-input').value = "";

    var placesArr = [];

    if (!localStorage.getItem('places')) {
        placesArr.push(userSearchVal);
        localStorage.setItem('places', JSON.stringify(placesArr));
    }
    else {
        placesArr = JSON.parse(localStorage.getItem('places'));

        // CHECK IF ITEM ALREADY EXISTS IN LOCALSTORAGE
        var placeExists = placesArr.find(place => place === userSearchVal.toLowerCase());
        if (!placeExists) {
            placesArr.push(userSearchVal);
            localStorage.setItem('places', JSON.stringify(placesArr));
        } else if (placeExists){
            console.log(`Place already added to storage: ${userSearchVal}`);
        }
    }

    searchFiveDayApi(userSearchVal);
    searchTodayApi(userSearchVal);
    displaySavedSearches();
    clickEvents();
}

// CREATE BUTTON FOR EACH LOCALSTORAGE PLACE
function displaySavedSearches() {
    placesSearched.innerHTML = '';
    var arrayFromStorage = JSON.parse(localStorage.getItem('places'));

    if (arrayFromStorage < 1) {
        console.log("empty")

    } else {
        for (var i = 0; i < arrayFromStorage.length; i++) {
            var placeBtn = document.createElement('button');
            placeBtn.className = "placeBtn";
            placeBtn.textContent = arrayFromStorage[i];
            placesSearched.appendChild(placeBtn);
        }
    }
}


// ADD CLICK EVENTS FOR BUTTONS
function clickEvents() {
    var allButtons = document.querySelectorAll(".placeBtn");
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', function () {
            weatherFiveDay.innerHTML = "";
            weatherToday.innerHTML = "";
            var userSearchVal = this.innerHTML;
            searchFiveDayApi(userSearchVal);
            searchTodayApi(userSearchVal);
        })
    }
};

// CLEAR LOCALSTORAGE
clearHistory.addEventListener('click', function () {
    localStorage.clear();
    placesSearched.innerHTML = "";
})

// CALL FUNCTIONS
formEl.addEventListener('submit', formSubmit);
displaySavedSearches();
clickEvents();
