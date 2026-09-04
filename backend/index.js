const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/generate-listing', async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'Description is required.' });
    }

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-3.6-flash',
            generationConfig: { responseMimeType: "application/json" }
        });
        const prompt = `
        Item: "${description}"
        Return ONLY JSON:
        {
        "title": "short attractive SEO title",
        "tags": ["3-5 search tags", "max 2 words each"],
        "priceRange": "estimated EUR range (e.g. 20€-35€)"
        }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

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