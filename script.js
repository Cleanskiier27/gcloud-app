document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('insight-form');
    const input = document.getElementById('prompt-input');
    const button = document.getElementById('generate-button');
    const responseContainer = document.getElementById('response-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const prompt = input.value.trim();
        if (!prompt) {
            return;
        }

        // --- 1. Set Loading State ---
        button.disabled = true;
        button.textContent = 'Reasoning...';
        responseContainer.innerHTML = `
            <div class="ai-response loading">
                <div class="spinner"></div>
                <p>Generating insights from Gemini...</p>
            </div>
        `;

        try {
            // --- 2. Fetch from API ---
            const response = await fetch('/api/generate-insight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            // --- 3. Display Response or Error ---
            if (!response.ok) {
                throw new Error(data.error || 'An unknown error occurred.');
            }

            responseContainer.innerHTML = `
                <div class="ai-response">
                    <h3>Gemini Response:</h3>
                    <pre>${data.insight}</pre>
                </div>
            `;

        } catch (error) {
            responseContainer.innerHTML = `
                <div class="ai-response error">
                    <h3>Error</h3>
                    <pre>${error.message}</pre>
                </div>
            `;
        } finally {
            // --- 4. Reset Button State ---
            button.disabled = false;
            button.textContent = 'Generate';
        }
    });
});