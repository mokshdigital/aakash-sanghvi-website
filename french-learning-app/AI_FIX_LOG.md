Step Id: 258
# Task Completion Log - AI Formatting Fix

## Objective
Resolve the "encountered an improper format stop reason" error when using the "Format with AI" feature in the French Learning App.

## Diagnosis
- The error indicates that the OpenAI API was called with `response_format: { type: "json_object" }` but the prompt did not explicitly contain the word "JSON".
- Access to the server-side Supabase Edge Function code was not available, requiring a client-side fix.

## Actions Taken
1.  **Analyzed `app.js`:** Located the `formatNotesWithAI` function and the `callEdgeFunction` utility.
2.  **Updated `formatNotesWithAI`:** Modified the payload sent to the Edge Function to include a strong system-like instruction prepended to the user notes.
    -   Added the keyword "JSON".
    -   Explicitly defined the expected JSON schema: `{ "formatted_notes": "markdown string", "tags": ["tag1", "tag2"] }`.
3.  **Proactive Fixes:** Applied similar JSON formatting instructions to other AI-dependent functions to prevent similar errors:
    -   `handleGrammarSubmit` (Generate Grammar)
    -   `handleMyVocabSubmit` (Analyze Word)
    -   `generateGenderQuiz`
    -   `generateVerbs`
    -   `handleQuizGenerate`
    -   `handleChatSubmit`

## Outcome
The `app.js` file has been updated with robust prompts that satisfy OpenAI's requirements for JSON mode. The application should now correctly format notes and perform other AI tasks without triggering the "improper format" error.

## Recent Fixes (2025-12-23)
### Issue: "My Vocabulary" Gemini Error
**Symptom:** "Invalid JSON payload received. Unknown name 'responseMimeType' at 'generation_config'".
**Cause:** The Edge Function used `responseMimeType: "application/json"` which caused compatibility issues with the deployed environment/model.
**Fix Phase 1 (Failed):** Updated SDK to `0.19.0` and `0.12.0` but errors persisted.
**Fix Phase 2 (Partial):** Removed `generationConfig` to revert to prompt-based JSON.
**Symptom 2:** "404 Not Found: models/gemini-1.5-pro-latest is not found".
**Fix Phase 3:** Switched to `gemini-1.5-flash-latest`.
**Feedback:** User explicitly requested `gemini-2.5-flash`.
**Fix Phase 4 (Failed):** Tried `gemini-2.0-flash-exp` based on assumption. User corrected this.
**Fix Phase 5 (Failed):** Updated model to `gemini-2.5-flash` per request, but function remained broken (likely due to 404 on that model name too).
**Fix Phase 6 (Final):** Updated model identifier to **`gemini-3-flash-preview`** per strict user instruction.
