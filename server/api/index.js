// api/index.js

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

app.get('/api', (req, res) => {
    res.send('Hello from Express on  - This API is working!');
  });

module.exports = app;
