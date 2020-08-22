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
	db.Workout.find({}).then(response => {
		res.json(response);
	}).catch(err => {
		res.json(err.message);
	});
});

app.put('/api/workouts/:id', async (req, res) => {
	db.Workout.update(
		{ _id: mongoose.Types.ObjectId(req.params.id) },
		{ $push: { exercises: req.body } },
		{ new: true }
	).then(data => {
		res.json(data);
	}).catch(err => {
		res.json(err);
	});
});

app.post("/api/workouts", async ({ body }, res) => {
	try {
        let data = await db.Workout.create(body)
        res.json(data);
    } catch ({ message }) {
        res.json(message);
    }
});

app.get('/api/workouts/range', async (req, res) => {
	try {
        let data = await db.Workout.find({}).sort({ day: -1 }).limit(7)
        res.json(data); 
    } catch (error) {
        res.json(error); 
    }
});

app.listen(PORT, () => {
	console.log(`Server running at localhost:${PORT}`);
});