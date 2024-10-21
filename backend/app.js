const express = require('express');
const fs = require('fs');
const cors = require('cors');
const csv = require('csv-parser');
const { resolve } = require('path');
const { rejects } = require('assert');
const db = require('./database')
const {getRelevantTexts} = require('./search')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Function to read CSV data

const readCSV = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('data.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

// Function to read CSV and insert data into PostgreSQL
// Function to read CSV and insert data into PostgreSQL
const readCSVAndInsertToDB = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('data.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    for (const item of results) {
                        // Destructure the object, renaming 'Sub-Title' to 'Sub_Title'
                        const { Chapter, Part, Title, 'Sub-Title': Sub_Title, Text } = item;

                        // Check for existing entry
                        const res = await db.pool.query(
                            'SELECT * FROM public.constitution_content WHERE chapter = $1 AND part = $2 AND title = $3 AND sub_title = $4',
                            [Chapter, Part, Title, Sub_Title]
                        );

                        if (res.rows.length === 0) {
                            // Only insert if no duplicate is found
                            await db.pool.query(
                                'INSERT INTO public.constitution_content (chapter, part, title, sub_title, text) VALUES ($1, $2, $3, $4, $5)',
                                [Chapter, Part, Title, Sub_Title, Text]
                            );
                        }
                    }
                    resolve('Data successfully inserted into the database.');
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};



app.get('/import', async (req, res) => {
    try {
        const message = await readCSVAndInsertToDB();
        res.send(message);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error: Unable to insert data into the database.');
    }
});


app.get('/data', async (req, res) => {
    try {
        const data = await readCSV();
        console.log(data)
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Route to get relevant texts
app.post('/relevant-texts', async (req, res) => {
    const userInput = req.body.userInput; // Assumes JSON body contains { "userInput": "your text" }

    if (!userInput) {
        return res.status(400).send('Bad Request: No input provided.');
    }

    try {
        // Get relevant texts based on user input
        const relevantTexts = await getRelevantTexts(userInput);
        console.log(relevantTexts);
        // Send the relevant texts as a JSON response
        res.json({
            success: true,
            data: relevantTexts
        });
    } catch (error) {
        res.status(500).send('Server Error: Unable to retrieve relevant texts.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
