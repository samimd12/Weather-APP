const apiKey = "775df081cdd9749d1b58d4519bd6487a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const weatherContainer = document.querySelector(".weather");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.maxHeight = "0"
    }
    else {

        var data = await response.json()


        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }
        document.querySelector(".weather").style.maxHeight = "500px"
        document.querySelector(".error").style.display = "none"
    }



}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
    toggleWeatherContainer();
})

function toggleWeatherContainer() {
    const isOpen = weatherContainer.style.maxHeight !== "0";
    weatherContainer.style.maxHeight = isOpen ? "0" : "500px";
}