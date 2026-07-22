import groq from "../config/groq.js";
import reviewPrompt from "../prompts/reviewPrompt.js";
    
export const reviewCodeService = async (code) => {

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: "system",
                content: "You are an expert code reviewer."
            },
            {
                role: "user",
                content: reviewPrompt(code)
            }    
        ],
    });

    return response.choices[0].message.content;
};