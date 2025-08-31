// @/services/itineraryService.ts
// NOTE: This file handles the API communication.

/**
 * =================================================================================
 * CRITICAL SECURITY WARNING: API Key Exposure
 * =================================================================================
 * The API key is exposed on the client-side in this function.
 * In a production environment, this function MUST be moved to a secure backend
 * (e.g., a Next.js API route, a serverless function) to protect your key.
 *
 * The frontend should call your backend endpoint, not the Google API directly.
 * =================================================================================
 */
export const generateItinerary = async (interests: string, days: number): Promise<string> => {
    const prompt = `You are an expert concierge for "Amritha Heritage", a luxury heritage resort in Thiruvananthapuram, Kerala, known for its colonial elegance, history, and fine dining at the Kohinoor Restaurant. A guest is staying for ${days} day(s) and is interested in: "${interests}". 
    
    Create a personalized, day-by-day itinerary for them. The tone should be welcoming and luxurious. 
    
    - Include activities both within the resort (like dining at Kohinoor, relaxing by the pool, heritage tours of the property) and nearby attractions relevant to their interests.
    - Structure the response clearly with headings for each day (e.g., "**Day 1: Arrival and Relaxation**").
    - Use Markdown for formatting (bolding, lists).
    - Keep descriptions concise but evocative.`;
  
    // IMPORTANT: Replace with an environment variable, e.g., import.meta.env.VITE_GEMINI_API_KEY
    // This key MUST NOT be committed to your repository.
    const apiKey = "YOUR_API_KEY_HERE"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error Response:", errorBody);
      throw new Error(`API request failed with status ${response.status}`);
    }
  
    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  
    if (!text) {
      console.error("Invalid API response structure:", result);
      throw new Error("Invalid response structure from API.");
    }
  
    return text;
  };