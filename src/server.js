const express = require('express');
const { google } = require('googleapis');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const PORT = process.env.API_PORT;

// Use cors middleware with specific configurations
app.use(cors({
    origin: process.env.URL_ORIGIN,
    methods: ['POST', 'GET', 'OPTIONS'], // Add other allowed methods as needed
    allowedHeaders: ['Content-Type'], // Add other allowed headers as needed
  }));
  

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.KEY_FILE_PATH, 
    scopes: [process.env.SCOPES]  
});

// Initialize the Google Sheets API
const sheets = google.sheets({ version: 'v4', auth });

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle form submission
app.post('/write-sheet', async (req, res) => {
    const spreadsheetId = process.env.SPREADSHEET_ID;  // The ID of the spreadsheet.
    const sheetName = process.env.SHEET_NAME;
    const valueInputOption = process.env.VALUE_INPUT_OPTION;  // How input data should be interpreted.

    const { nombres, dni, celular, tarjeta, monto, region, occupation } = req.body;

    const values = [[nombres, dni, celular, tarjeta, monto, region, occupation]];  // The data to be written.

    try {
        // Read existing rows
        const responseRead = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${sheetName}!A1:Z`, // Read all rows
        });

        const existingRows = responseRead.data.values || [];
        const numRows = existingRows.length;

        // Calculate the range for the next available row
        const range = `${sheetName}!A${numRows + 1}:Z${numRows + 1}`;

        const resource = { values };

        // Write data to the next available row
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        });

        console.log('Data written successfully');
        res.status(200).json({ message: 'Data written successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to handle reading the Google Sheet
app.post('/read-sheet', async (req, res) => {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const sheetName = 'Sheet1';
    const range = `${sheetName}!A1:Z`;  // Read all rows

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range
        });
        const rows = response.data.values || [];  // Extracts the rows from the response.
        
        res.status(200).json(rows); // Send the rows back as JSON response.
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT,  '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });