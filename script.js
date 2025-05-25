 const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkweather(city) {
    const api_key = "b4afbbc9549c9c6e4566cc1643921643";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod == '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

        switch (weather_data.weather[0].main.toLowerCase()) {
            case 'clouds':
                weather_img.src = "cloudsun1.png";
                break;
            case 'clear':
                weather_img.src = "sun.webp";
                break;
            case 'rain':
                weather_img.src = "rain.avif";
                break;
            case 'mist':
                weather_img.src = "spring.jpg";
                break;
            case 'snow':
                weather_img.src = "snow.jpg";
                break;
            default:
                weather_img.src = "default.jpg";
                break;
        }

        console.log(weather_data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

searchBtn.addEventListener('click', () => {
    checkweather(inputBox.value);
});
