const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type:
            {
                type: String,
                trim: true,
                // required: "Resistance or Cardio?"
            },
            name:
            {
                type: String,
                trim: true,
                // required: "Name of exercise?"
            },
            duration:
            {
                type: Number,
                // required: "Workout duration?"
            },
            distance:
            {
                type: Number,
                // required: "Distance?"
            },
            weight:
            {
                type: Number,
                // required: "How much weight?"
            },
            reps:
            {
                type: Number,
                // required: "How many reps?"
            },
            sets:
            {
                type: Number,
                // required: "How many sets?"
            }
        }
    ]
},
    {
        toJSON: { virtuals: true }
    }
);

workoutSchema.virtual("durationTotal").get(function() {
    return this.exercises.reduce(function(total, exercise){
        return total + exercise.duration;
    }, 0);
});


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;