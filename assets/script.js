var inputEl = document.querySelector('#search-input');

var userSearch = 'london'

function searchApi() {
    // var fetchURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&appid=6c3537dc7701b1d2d52795e48bb67bd3`

    var fetchURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userSearch + '&appid=6c3537dc7701b1d2d52795e48bb67bd3';
    console.log(fetchURL)

    fetch(fetchURL).then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    }).then(function (data) {
        console.log(data)
    })
        .catch(function (error) {
            console.log(error);
        })
};

searchApi()

