const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) return;
    getWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const city = cityInput.value.trim();
        if(!city) return;
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG.WEATHER_API_KEY}&units=imperial`;


    showLoading(true);
    hideError();
    hideWeatherCard();

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error('City not Found');
        }

        const data = await response.json();
        displayWeather(data);

    }   catch (error) {
        showError(error.message);
    }   finally {
        showLoading(false);
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°F`;
    document.getElementById('condition').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${Math.round(data.wind.speed)} mph`;
    document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°F`;
    document.getElementById('weather-icon').textContent = getWeatherEmoji(data.weather[0].main);

    document.getElementById('weather-card').classList.remove('hidden');
    document.getElementById('style-selector').classList.remove('hidden');

    setupStyleButtons(data);
}

function getWeatherEmoji(condition) {
    const conditions = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Fog': '🌫️'
    };
    return conditions[condition] || '🌡️';
}

function setupStyleButtons(weatherData) {
    const styleBtns = document.querySelectorAll('.style-btn');
    styleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            styleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            getAISuggestion(weatherData, btn.dataset.style);
        });
    });
}

function showLoading(show) {
    document.getElementById('loading').classList.toggle('hidden', !show);
}

function showError(message) {
    document.getElementById('error-text').textContent = message;
    document.getElementById('error').classList.remove('hidden');
}

function hideError() {
    document.getElementById('error').classList.add('hidden');
}

function hideWeatherCard() {
    document.getElementById('weather-card').classList.add('hidden');
    document.getElementById('style-selector').classList.add('hidden');
    document.getElementById('ai-suggestion').classList.add('hidden');
}