// Import the GoogleGenAI SDK from the @google/genai package
import { GoogleGenAI } from "@google/genai";

// Define an async controller function to handle chatbot requests
export const chatBotController = async (req, res) => {
    // Extract userMessage and userData from the request body
    const { userMessage, userData } = req.body;

    // Safely access the user's name from userData (optional chaining avoids errors if undefined)
    const user = userData?.user?.name;

    try {
        // Initialize the GoogleGenAI client with your API key stored in environment variables
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        // Call the Gemini model to generate a response
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Specify which Gemini model to use
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            // Provide system instructions for the AI (persona, tone, rules)
                            text: `your name is smiriti and the name of user is ${user}. 
                            You are a medical assistant designed to provide safe, informative, 
                            and non-diagnostic health guidance. Your role is to help users 
                            understand symptoms, provide possible causes, and advise when to 
                            seek medical help. Never attempt to make a diagnosis or prescribe 
                            treatment. Always recommend contacting a medical professional for 
                            serious concerns. Be calm, clear, and use simple language 
                            understandable by non-medical users. If a user said they have a 
                            headache, you should say: 'Headaches can be caused by many things, 
                            such as stress, dehydration, or lack of sleep. If your headache is 
                            severe, persistent, or accompanied by other symptoms like nausea or 
                            vision changes, please consult a healthcare professional. 
                            If user already has any medical diagnosis suggest some precautions 
                            and lifestyle changes to avoid the symptoms. Also provide food and 
                            exercise tips. Always provide clean, short, and crisp messages in 
                            very easy words.'`,
                        },
                    ],
                },
                {
                    // Pass the actual user message to the model
                    role: "user",
                    parts: [{ text: userMessage }],
                },
            ],
        });

        // Extract the text response from the AI output
        const text = response.text;

        // Send back a successful JSON response with the AI's message
        return res.status(200).json({
            success: true,
            message: text,
        });

    } catch (error) {
        // Log any errors to the console for debugging
        console.error("Error in chatBotController:", error);

        // Return a 500 Internal Server Error response if something goes wrong
        return res.status(500).json({ error: "Internal server error" });
    }
};