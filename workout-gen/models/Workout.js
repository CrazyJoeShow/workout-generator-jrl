const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
      },
    exercises: [
        {
            type: {
                type: String,
                required: "Type of Exercise is Required",
                minlength: 1
                
            },
            name: {
                type: String,
                required: "Name of Exercise is Required",
                minlength: 1
            },
            distance: {
                type: Number,
            },
            duration: {
                type: Number,
                required: "Duration is Required",
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
         }
      ]
    },
    {
        //this includes virtual properties when data is requested
        toJSON: {
          virtuals: true
        }
    });



    WorkoutSchema.virtual("totalDuration").get(function() {
        return this.exercises.reduce((total,current) =>  total + current.duration,0)
      });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;