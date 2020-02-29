const express = require("express");
const dotenv = require("dotenv");

//Route files
const projects = require('./routes/projects');

dotenv.config({ path: "./config/config.env" });

const app = express();

//Mount routers
app.use('/api/v1/projects', projects);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
