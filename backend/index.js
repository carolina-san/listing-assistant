const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Groq = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/generate-listing', async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'Description is required.' });
    }

    try {
        const prompt = `
        Item: "${description}"
        Return ONLY JSON:
        {
        "title": "short attractive SEO title",
        "tags": ["3-5 search tags", "max 2 words each"],
        "priceRange": "estimated EUR range (e.g. 20€-35€)"
        }
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an assistant that outputs strictly valid JSON."
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
        const aiData = JSON.parse(responseText);

        res.json(aiData);

    } catch (error) {
        console.error('Error processing the request with AI:', error);
        res.status(500).json({ error: 'Internal error generating article data.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});