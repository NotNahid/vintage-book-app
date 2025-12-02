const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Load credentials from the file
const credentialsPath = path.join(__dirname, 'credentials.json');
const credentials = require(credentialsPath);

// Configure Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Google Sheet ID (replace with your actual Sheet ID)
const SPREADSHEET_ID = '1fbD5ZxlH1DaM_ZZMg3RHS-N_zodDTPdsdlXyr0Vsje8';

// Handle pre-flight requests for the /submit-form route
app.options('/submit-form', cors());

app.post('/submit-form', async (req, res) => {
  const { 'first-name': firstName, 'last-name': lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const timestamp = new Date().toLocaleString();
    const values = [[timestamp, firstName, lastName, email, message]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E', // Assuming your sheet has columns A, B, C, D, E for Timestamp, FirstName, LastName, Email, Message
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });

    res.status(200).json({ message: 'Form data submitted successfully!' });
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    res.status(500).json({ error: 'Failed to submit form data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
