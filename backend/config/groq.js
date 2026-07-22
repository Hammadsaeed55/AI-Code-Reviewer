import dotenv from "dotenv";
dotenv.config();

import { Groq } from "groq-sdk/client.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export default groq;