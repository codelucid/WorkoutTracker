const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
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

workoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce(function(total, exercise){
        return total + exercise.duration;
    }, 0);
});


const Resistance = mongoose.model("Resistance", resistanceSchema);

module.exports = Resistance;