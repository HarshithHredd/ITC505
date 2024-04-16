// server.js

// Import required modules
const express = require('express');
const logger = require('morgan');
const path = require('path');

// Create an Express app
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Define routes
app.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Serve static files from the 'public' directory
const publicServedFilesPath = path.join(__dirname, 'public');
app.use(express.static(publicServedFilesPath));

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Handle form submission
app.post('/submit', (req, res) => {
  const { adjective, noun1, verb, place, animal } = req.body;

  // Create the Mad Lib
  const madLib = `The quick ${adjective} ${noun1} ${verb} over the ${place} ${animal}.`;

  // Send the filled-in Mad Lib as the response
  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/">Go Back to Form</a>
  `);
});
