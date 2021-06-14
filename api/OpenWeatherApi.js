API_KEY = "b5192a2cd82a431d3f156574a063bd8c";

export function getCurrentWeather(location) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+API_KEY+"&units=metric";
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
}

export function get7DaysForcast(lat, lon) {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=current,minutely,hourly&appid="+API_KEY+"&units=metric";
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error));
}

export function getIcon(path) {
    return "https://openweathermap.org/img/wn/"+path+"@2x.png";
}