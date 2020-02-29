const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.get('/', (req, res) => {
    res.status(200);
    res.send('Server initialized');
});

app.get('/api/v1/projects', (req, res) => {
  res.status(200).json({ success: true, msg: 'Get all project cars' });
});

app.get('/api/v1/projects/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Get project car ${req.params.id}` });
});

app.post('/api/v1/projects', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new project car' });
});

app.put('/api/v1/projects/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Display project car ${req.params.id}` });
});

app.delete('/api/v1/projects/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Delete project car ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
