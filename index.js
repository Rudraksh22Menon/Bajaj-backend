const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://bajaj-frontend-tau-ruddy.vercel.app' // Replace with your actual Vercel URL
  }));
// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Set up the server to listen on port 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
  
    // Extract numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
  
    // Find highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 
      ? [lowercaseAlphabets.sort().pop()] 
      : [];
  
    // Handle file validation (Base64 check)
    const fileValid = file_b64 ? true : false; // Placeholder logic for now
    const fileMimeType = fileValid ? 'image/png' : null; // Replace with actual MIME type check
    const fileSizeKB = fileValid ? (Buffer.from(file_b64, 'base64').length / 1024).toFixed(2) : null;
  
    // Construct the response object
    const response = {
      is_success: true,
      user_id: "your_name_ddmmyyyy",  // Replace with actual name and DOB
      email: "your_email@domain.com", // Replace with actual email
      roll_number: "ABCD123",         // Replace with actual roll number
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKB
    };
  
    // Return the response
    res.status(200).json(response);
  });
app.get('/bfhl', (req, res) => {
  // Hardcoded response for the GET request
  res.status(200).json({ operation_code: 1 });
});
  