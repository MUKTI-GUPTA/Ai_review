const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINE_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "Explain how AI works";

async function generateContent(prompt) {
    const result = await model.generateContent(prompt);

    return result.response.text();
}


module.exports = generateContent