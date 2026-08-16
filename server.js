import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// --- Mock Data (moved from original data.js for simplicity) ---
const INITIAL_QUERIES = [
  { id: 'q1', query: 'chrome os developer tools analytics', clicks: 14200, impressions: 185000, ctr: 0.0767, position: 2.1 },
  { id: 'q2', query: 'chrome os agi engine integration', clicks: 11800, impressions: 142000, ctr: 0.0831, position: 1.8 },
  { id: 'q3', query: 'vertex ai proxy interceptor setup', clicks: 9400, impressions: 210000, ctr: 0.0447, position: 4.3 },
  { id: 'q4', query: 'web search console metric overlay', clicks: 8100, impressions: 198000, ctr: 0.0409, position: 5.8 },
];

// --- Express App Setup ---
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve(path.dirname(''));

// --- Middleware ---
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', path.join(__dirname, 'simple-app/views'));
app.use(express.static(path.join(__dirname, 'simple-app/public'))); // Serve static files (CSS)
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json()); // To parse JSON request bodies

/**
 * Main Route: Renders the dashboard page.
 * It can optionally receive AI-generated insights to display.
 */
app.get('/', (req, res) => {
  res.render('index', {
    queries: INITIAL_QUERIES,
  });
});

/**
 * API Route: Handles the AI insight generation and returns JSON.
 */
app.post('/api/generate-insight', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Please enter a prompt.' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is not configured on the server.' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const systemPrompt = "You are an elite Search Engine Optimization and Chrome OS Technical Architect AGI assistant. Provide structured, high-value, actionable insights with bullet points. Use markdown for formatting.";

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(errorData.error?.message || 'Failed to fetch from Gemini API.');
    }

    const data = await geminiResponse.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ insight: resultText || "No insight received from the API." });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Simple app server running at http://localhost:${port}`);
});