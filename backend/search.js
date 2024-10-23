const db = require('./database'); // Assuming you have a database module for PostgreSQL connection
// Ensure node-fetch is installed
require('dotenv').config();

const openAIHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`
    // Replace with your actual OpenAI API key
}

async function createEmbedding(textToEmbed) {
    try {
        let response = await fetch(`https://api.openai.com/v1/embeddings`, {
            method: 'POST',
            headers: openAIHeaders,
            body: JSON.stringify({
                "input": textToEmbed,
                "model": "text-embedding-3-small"
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.data[0].embedding;
        } else {
            const errorText = await response.text();
            console.error(`Error creating embedding for text: ${textToEmbed}, API Response: ${errorText}`);
            return null;
        }
    } catch (error) {
        console.error(`Error making request to OpenAI for text: ${textToEmbed}, Error: ${error.message}`);
        return null;
    }
}

// Function to compare user input embedding with database embeddings
async function getRelevantTexts(userInput) {
    try {
        // Generate the embedding for the user input
        const userEmbedding = await createEmbedding(userInput);

        if (!userEmbedding) {
            throw new Error('Failed to generate embedding for user input.');
        }

        // Convert the user embedding to JSONB format
        const userEmbeddingJson = JSON.stringify(userEmbedding);

        // Connect to PostgreSQL
        const client = await db.pool.connect();

        // Query the database to calculate the dot product using the custom function
        const query = `
            SELECT 
                text,
                chapter,
                part,
                title,
                sub_title,
                dot_product_jsonb(vector, $1::jsonb) AS score
            FROM 
                public.constitution_content
            ORDER BY 
                score DESC
            LIMIT 5;
        `;

        // Run the query with the user embedding
        const res = await client.query(query, [userEmbeddingJson]);

        // Release the client connection
        client.release();

        return res.rows; // Return the results
    } catch (error) {
        console.error('Error retrieving relevant texts:', error);
        throw error;
    }
}


module.exports = {
    getRelevantTexts,
}
