import groq from "../config/groq.js";
import reviewPrompt from "../prompts/reviewPrompt.js";
    
export const reviewCodeService = async (language, code) => {

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: "system",
                content: "You are an expert code reviewer."
            },
            {
                role: "user",
                content: reviewPrompt(language, code)
            }    
        ],
    });

    return response.choices[0].message.content;
};