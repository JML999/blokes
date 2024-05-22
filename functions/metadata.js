const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const path = require('path');

const app = express();

let metadata = [];
try {
  metadata = JSON.parse(fs.readFileSync(path.join(__dirname, 'metadata.json'), 'utf-8'));
  console.log('Metadata loaded:', metadata);
} catch (error) {
  console.error('Error reading metadata:', error);
}

app.get('/metadata/:id', (req, res) => {
  const id = req.params.id;
  const data = metadata.find(item => item['File Name'] === `${id}.json`);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Metadata not found' });
  }
});

module.exports.handler = serverless(app);


