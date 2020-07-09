const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

// router.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "../public/index.html"));
// });

// router.get("/exercise/", (req, res) => {
//     res.sendFile(path.join(__dirname + "../public/exercise.html"));
// });

// router.get("/stats/", (req, res) => {
//     res.sendFile(path.join(__dirname + "../public/stats.html"));
// });

router.get("/exercise/", (req,res) => {
    Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/stats/", (req,res) => {
    Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({}).sort({ day: -1 }).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        });
});

// Do I need $set { day: Date.now() } below??? Or is in icluded from the model
router.post("/api/workouts/", ({ body }, res) => {
    Workout.create(body)
    .then(({_id}) => Workout.findByIdAndUpdate({_id}, { $set: { day: Date.now() } }, { new: true}))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        })
});

// Do I need mongojs to replace dbWorkout on line 30??? Params instead of body for the request on line 29??? That would mean switching body.id and params.id on line30, too
router.put("/api/workouts/:id", ({ body }, res) => {
    Workout.updateOne(body.id) 
    .then(({_id}) => Workout.findOneAndUpdate({_id}, { $push: { exercises: (params.id) } }))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        })
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).sort({ day: -1 }).limit(7).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json(err);
        })
});



module.exports = router;
