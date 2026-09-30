const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk/index.js');

const app = express();
app.use(cors());
app.use(express.json());

const isMockMode = process.env.MOCK_MODE === 'true' || !process.env.GROQ_API_KEY;

app.post('/api/generate-listing', async (req, res) => {
    const { description, language } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'Description is required.' });
    }

    if (isMockMode) {
        console.log('MOCK_MODE enabled: Returning mock response.');

        if (Math.random() < 0.2) {
            return res.status(500).json({ error: 'Internal error generating article data.' });
        }

        return res.json({
            title: `[MOCK] ${description}`,
            tags: ["mock tag", "example", "test"],
            priceRange: "10€-25€"
        });
    }

    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const prompt = `
        Item: "${description}"
        Return ONLY JSON in this language ${language}:
        {
        "title": "short attractive SEO title",
        "tags": ["3-5 search tags", "max 2 words each"],
        "priceRange": "estimated EUR range (e.g. 20€-35€)"
        }
        `;
        console.log(language);

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are an assistant that outputs strictly valid JSON in this language: ${language}`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "openai/gpt-oss-20b",
            response_format: { type: "json_object" },
            temperature: 0.2
        });

        const responseText = completion.choices[0].message.content;
        let aiData = JSON.parse(responseText);
        if (aiData.tags.length > 3) {
            aiData.tags = aiData.tags.slice(0, 3);
        }
        res.json(aiData);

    } catch (error) {
        console.error('Error processing the request with AI:', error);
        res.status(500).json({ error: 'Internal error generating article data.' });
    }
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;