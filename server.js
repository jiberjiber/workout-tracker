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

//
// HTML Routes
//
app.get('/', async (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/exercise', async (req, res) => {
	res.sendFile(path.join(__dirname, './public/exercise.html'));
});

app.get('/stats', async (req, res) => {
	res.sendFile(path.join(__dirname, "./public/stats.html"))
});

//
// API Routes
//
app.get('/api/workouts', async (req, res) => {

});

app.put('/api/workouts/:id', async (req, res) => {

});

app.post("/api/workouts", async ({ body }, res) => {

});

app.get('/api/workouts/range', async (req, res) => {

});

app.listen(PORT, () => {
	console.log(`Server running at localhost:${PORT}`);
});