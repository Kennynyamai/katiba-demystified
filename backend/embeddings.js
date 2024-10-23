const db = require('./database');
require('dotenv').config();


const openAIHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`
}

async function createEmbedding(textToEmbed) {
    let response = await fetch(`https://api.openai.com/v1/embeddings`, {
        method: 'POST',
        headers: openAIHeaders,
        body: JSON.stringify({
            "input": textToEmbed,
            "model": "text-embedding-3-small"
        }),
    });
    
    if(response.ok){
        const data = await response.json();
        return data.data[0].embedding;
    } else {
        console.error(`Error creating embedding for text: ${textToEmbed}`);
        return null;
    }
}

// Function to update the table with embeddings
async function updateConstitutionWithEmbeddings() {
    try {
        // Connect to PostgreSQL
        const client = await db.pool.connect();

        // Fetch all rows that need embeddings
        const res = await client.query('SELECT id, text FROM public.constitution_content');
        const rows = res.rows;

        // Iterate through each row
        for (const row of rows) {
            const embedding = await createEmbedding(row.text);

            if (embedding) {
                // Convert the embedding array to a JSON string before inserting it
                const embeddingJson = JSON.stringify(embedding);

                // Update the row with the embedding in the vector column
                await client.query(
                    'UPDATE public.constitution_content SET vector = $1 WHERE id = $2',
                    [embeddingJson, row.id]
                );
                console.log(`Updated embedding for row id: ${row.id}`);
            } else {
                console.error(`Failed to create embedding for row id: ${row.id}`);
            }
        }

        client.release(); // Release the connection back to the pool
    } catch (error) {
        console.error('Error updating embeddings:', error);
    } finally {
        // Optionally, disconnect from PostgreSQL pool if the application won't continue
        await db.pool.end();
    }
}

// Run the script
updateConstitutionWithEmbeddings();

