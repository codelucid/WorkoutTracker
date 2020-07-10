const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardioSchema = new Schema({
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


const Cardio = mongoose.model("Cardio", cardioSchema);

module.exports = Cardio;