require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function checkModels() {
    try {
        const models = await groq.models.list();
        const modelIds = models.data.map(m => m.id);
        console.log("Modelos activos en tu cuenta. Copia uno de estos IDs exactos:");
        console.log(modelIds);
    } catch (error) {
        console.error("Error:", error);
    }
}

checkModels();