const APP_KEY = `9c399c60631bbf4324b7b0b707e2a8c8`;

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const weatherMapApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_KEY}&units=metric`;
    // url을 부른다
    fetch(weatherMapApiUrl)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather");
            const temp = document.querySelector("#temp");
            const city = document.querySelector("#city");
            city.innerText = `City : ${data.name}`;
            temp.innerText = `Temp : ${data.main.temp} °C`;
            weather.innerText = `Weather : ${data.weather[0].main}`;
        });
    //console.log(JSON.stringify(weatherMapApiUrl));
}
function onGeoError() {
    alert("Can't find you. No weather for you.");
}
/**
 * Geolocation.getCurrentPosition() = 현 장치의 현재 위치를 가져옴
 * 형태 : navigator.geolocation.getCurrentPosition(success, error, [options])
 */

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

// weathermap key = 9c399c60631bbf4324b7b0b707e2a8c8