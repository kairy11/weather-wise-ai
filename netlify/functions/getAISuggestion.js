const fetch = require('node-fetch');

exports.handler = async function(event) {
    const {temp, condition, city, style} = JSON.parse(event.body);
    const apiKey = process.env.OPENAI_API_KEY;

    const prompt = `The weather in ${city} is currently ${temp}°F with ${condition}. 
Suggest a specific outfit for someone who prefers ${style} style. 
Be practical and specific about clothing items. Keep it to 2-3 sentences.`;

    try { 
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }, 
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                max_tokens: 150,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful personal stylist who gives practical outfit advice based on weather conditions.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });
        
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ suggestion: data.choices[0].message.content})
        };
    } catch (error) {
        return {
            statusCode: 500, 
            body: JSON.stringify({ message: error.message})
        };
    }
};