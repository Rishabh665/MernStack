// importing express packages so we can create a express routerObject instance,
// express import is necessary because each file has its scope and express application object is available throughout the app
// but to create a router express package needed to be import
// if we import app from suppose an app.js file then it create circular dependency which is not good.
// therefore, we import express packages again and nodejs make sure if something is already loaded installed ,it do not again install that package
// but provide its reference i guess to where it is imported again;

const express = require("express");

const router = express.Router();

// importing model : Workout
const Workout = require("../models/workoutModel");

// here router instance is stored in this variable;
// express factory function is also an object and inside that we have Router() method which creates express routerObject instance
// (// function can have property and methods)

// importing controller functions and storing their references using destructing;
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// GET All Route
router.get("/getWorkouts", getAllWorkouts);

// GET Route
router.get("/workout/:id", getWorkout);

// POST Route

router.post("/new/addWorkout", createWorkout);

// PUT Route
router.patch("/updateWorkout/:id", updateWorkout);

// DELETE Route
router.delete("/deleteWorkout/:id", deleteWorkout);

// in node every file is module and to export it to another file (scope) we use following:-

module.exports = router;
