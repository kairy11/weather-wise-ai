async function getAISuggestion(weatherData, style) {
    const temp = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].description;
    const city = weatherData.name;

    const prompt = `The weather in ${city} is currently ${temp}°F with ${condition}. 
    Suggest a specific outfit for someone who prefers ${style} style. 
    Be practical and specific about clothing items. Keep it to 2-3 sentences.`;

    document.getElementById('ai-suggestion').classList.remove('hidden');
    document.getElementById('suggestion-text').textContent = 'Getting suggestion...';

    try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                max_tokens: 150,
                messages: [
                    {role: 'system', content: 'You are a helpful personal stylist who gives practical outfit advice based on weather conditions.'},
                    {role: 'user', content: prompt}
                ]
            })
        });
        const data = await response.json();
        document.getElementById('suggestion-text').textContent = data.choices[0].message.content;
    } else {
        const response = await fetch('/.netlify/functions/getAISuggestion', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({temp, condition, city, style})
        });
        const data = await response.json();
        document.getElementById('suggestion-text').textContent = data.suggestion;
    }
    } catch (error) {
        document.getElementById('suggestion-text').textContent = 'Could not get suggestion. Try again.';
    }
}