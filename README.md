# 🌤 WeatherWise AI

A weather dashboard that combines real-time weather data with AI-powered outfit suggestions based on your style preference.

**Live Demo:** https://weatherwise-ai-kairy.netlify.app

---

## What It Does

- Search any city and get live weather data including temperature, conditions, humidity, wind speed, and feels-like temperature
- Select your style preference (Casual, Formal, Athletic, Streetwear)
- Get an AI-generated outfit suggestion tailored to the current weather and your style

---

## Tech Stack

- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Weather Data:** OpenWeatherMap API
- **AI Suggestions:** OpenAI GPT-3.5 Turbo
- **Serverless Functions:** Netlify Functions (API key protection)
- **Deployment:** Netlify

---

## Setup

Clone the repo and add your own API keys to Netlify environment variables:

- `OPENAI_API_KEY` - from platform.openai.com
- `WEATHER_API_KEY` - from openweathermap.org

For local development, add your keys to `config.js` (not tracked in git).

---

## Features

- Real-time weather data for any city worldwide
- AI outfit recommendations powered by GPT-3.5 Turbo
- API keys protected via Netlify serverless functions
- Responsive design — works on mobile and desktop
- Error handling for invalid cities and failed requests