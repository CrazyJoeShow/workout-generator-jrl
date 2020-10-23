const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    
    },
    excercises: [
        {
            type: {type: String},
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number,
        },
    ],
});