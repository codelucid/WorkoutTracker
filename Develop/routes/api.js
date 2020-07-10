const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

// const db = require("../models");


router.get("/exercise/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});



router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/api/workouts/", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        })
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    const { id }= params;
    Workout.findByIdAndUpdate(id, { $push: { exercises: body } }, {upsert: true})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).sort({ day: 1 }).limit(7).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        })
});



module.exports = router;
