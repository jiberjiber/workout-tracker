// Require dependencies
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./models');

// Port declaration
const PORT = process.env.PORT || 3000;

// Express initialization
const app = express();

// Express JSON handling
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public folder handling
app.use(express.static("public"));

// Logging
app.use(morgan('dev'));

// Mongo Connect
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout-tracker", { useNewUrlParser: true, useUnifiedTopology: true });





app.listen(PORT, () => {
	console.log(`Server running at localhost:${PORT}`);
});