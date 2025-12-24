// @ts-nocheck - This file runs in Supabase Edge Functions (Deno runtime), not Node.js
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.19.0";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // 1. Get Gemini API Key from Supabase Secrets
        const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
        if (!GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not set in Supabase Secrets');
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        // Use the latest stable model or the one requested (gemini-1.5-pro)
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview"
        });

        // 2. Determine Request Type from URL
        // URL format: .../functions/v1/french-ai/<action>
        const url = new URL(req.url);
        const pathParts = url.pathname.split('/');
        // Only get the last segment if it isn't 'french-ai'. 
        // If it ends in 'french-ai', we might need to check the body or it's a default action?
        // Based on app.js, we append /endpoint.
        const action = pathParts[pathParts.length - 1];

        // 3. Parse Body
        const body = await req.json();
        const {
            notes,
            topic,
            instructions,
            word,
            type,
            message,
            history,
            vocabType,
            images // NEW: Array of base64 data URLs for vision
        } = body;

        console.log(`Received action: ${action}, images: ${images?.length || 0}`);

        // 4. Construct Prompt
        let prompt: any = "";

        // Base System Instruction (can be reinforced here)
        const baseInstruction = "You are an expert French Language Tutor. STRICTLY output valid JSON.";

        switch (action) {
            case 'format-notes':
                // Check if we have images for vision processing
                if (images && images.length > 0) {
                    // MULTIMODAL: Create content parts with images
                    const parts: any[] = [
                        { text: `${baseInstruction}\n${notes}` }
                    ];

                    // Add each image as an inline data part
                    for (const imageDataUrl of images) {
                        // Parse data URL: data:image/jpeg;base64,/9j/4AAQ...
                        const match = imageDataUrl.match(/^data:(.+);base64,(.+)$/);
                        if (match) {
                            parts.push({
                                inlineData: {
                                    mimeType: match[1],
                                    data: match[2]
                                }
                            });
                        }
                    }

                    prompt = parts;
                } else {
                    // TEXT ONLY: Standard prompt
                    prompt = `${baseInstruction}\n${notes}`;
                }
                break;

            case 'generate-grammar':
                prompt = `${baseInstruction}\n${instructions}\n\nTopic:\n${topic}`;
                break;

            case 'generate-vocab':
                prompt = `${baseInstruction}\n${instructions}\n\nTopic: ${topic}`;
                if (vocabType) prompt += `\nType: ${vocabType}`;
                break;

            case 'analyze-word':
                prompt = `${baseInstruction}\n${instructions}\n\nWord/Phrase:\n${word}`;
                break;

            case 'generate-quiz':
                prompt = `${baseInstruction}\n${instructions}\n\nQuiz Type: ${type}`;
                break;

            case 'chat':
                const historyStr = history
                    ? history.map((h: any) => `${h.role}: ${h.content}`).join('\n')
                    : '';
                prompt = `${baseInstruction}\n${instructions}\n\nChat History:\n${historyStr}\n\nUser Message:\n${message}`;
                break;

            default:
                throw new Error(`Unknown endpoint action: ${action}. URL was: ${url.pathname}`);
        }

        // 5. Call Gemini
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        console.log("Gemini Raw Response:", responseText);

        // 6. Parse JSON (Gemini usually handles this well with responseMimeType, but safety first)
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(responseText);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            // Attempt to clean common markdown fences if mode failed
            const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            try {
                jsonResponse = JSON.parse(cleanText);
            } catch (e2) {
                throw new Error(`Failed to parse Gemini response as JSON. Raw: ${responseText}`);
            }
        }

        // 7. Return Result
        return new Response(JSON.stringify(jsonResponse), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Edge Function Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
});
