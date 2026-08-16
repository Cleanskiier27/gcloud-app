import { useState } from 'react';

export const useGemini = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [error, setError] = useState(null);

  const generateInsight = async (prompt) => {
    if (!prompt || !prompt.trim()) return;

    setIsLoadingAi(true);
    setAiResponse('');
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/generate-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unknown error occurred.');
      }

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      setAiResponse(resultText || "Unable to retrieve Gemini AI insights.");

    } catch (err) {
      const errorMessage = `**Error:** Could not connect to the AGI service. \n\n* **Details:** ${err.message}\n* **Action:** Please ensure the backend server is running.`;
      setError(errorMessage);
      setAiResponse(errorMessage); // Also display error in the UI
    } finally {
      setIsLoadingAi(false);
    }
  };

  return { aiResponse, isLoadingAi, error, generateInsight, setAiResponse };
};