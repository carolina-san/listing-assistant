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
    You are an expert in e-commerce and SEO.
    Analyze the following article description and, with the information available online, generate:
    1. An attractive and optimized title for sales. (not too long as it will be truncated)
    2. A list of 3 to 5 search tags. (single words only no long phrases, max 2 words per tag)
    3. A suggested price range in EUR (example: "20€ - 35€").

    Return ONLY a JSON object with this exact structure:
    {
        "title": "string",
        "tags": ["string", "string", "string"],
        "priceRange": "string"
    }
    
    Article description: "${description}"
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