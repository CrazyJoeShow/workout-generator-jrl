const express = require("express");
const mongoose = require("mongoose");
const db = require("./workout-gen/models");
const app = express();

const PORT = process.env.PORT || 3000;
const workoutsController = require("./workout-gen/controllers/workoutsController");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect
  (process.env.MONGODB_URI || "mongodb://localhost/workout", 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false,
  }
);

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose successfully connected.");
})

connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
});

app.use(workoutsController);

app.get("/api/config", (req, res) => {
    res.json({
        success: true,
    });
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then((foundWorkouts) => {
        res.json(foundWorkouts);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to retrieve Workouts.",
        });
    });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(7).then((foundWorkoutRange) => {
        res.json(foundWorkoutRange);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to retrieve Workouts.",
        });
    });
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
    }).catch(err => {
        console.log(err);
        res.json({
            error: true,
            data: null,
            message: "Failed to create workout.",
        });
    });
});

app.listen(PORT,() => {
    console.log(`App is running on http://localhost:${PORT}`);
});