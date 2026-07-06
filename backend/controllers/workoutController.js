// by creating functions in controller and exporting them inside an object;
// then importing their refernces using destructing in route/workoutRoutes file, we are organising our code better
const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

// get all workouts

const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  // {} empty object to find all document
  // {reps:20} like this inside find(), will give all docs from db where reps = 20;
  // sort based on time when created in descending order: means newest first;

  res.status(200).json(workouts); // workouts: array of objects, where each object represent a workout
};

// get a single workout
const getWorkout = async (req, res) => {
  // req.params property (to get the all the route parameters)
  // destructing and get id from request object params property
  const { id } = req.params;

  // Check if id is a valid ObjectId : 24 hexadecimal, 12 character something
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Workout!" });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      //i.e.(workout === null || workout === undefined)

      return res.status(404).json({ error: "No such Workout!" });
    }
    // we use return because if error happen without return it will further fire our code; so we want to stop execution from that point

    // when successful
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
 
  // error handling
  let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    } 
    if (!load) {
      emptyFields.push("load");
    }
    if (!reps) {
      emptyFields.push("reps");
    }

    if(emptyFields.length>0){
      return res.status(400).json({error:"Please fill all the fields", emptyFields})
    }

  // add document to database
  try {
    const workout = await Workout.create({ title, reps, load });

    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // improvement if a workout is created and same data which all feilds
  // equal to previous one than, it should prompt this document already exists...
};

// delete a workout :  actually me ye db me change hi nahi kar raha
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Enter a valid ObjectId" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    // iska to koi effect hi nahi hai
    return res.status(404).json({ error: "No such Workout" });
  } else {
    res.status(200).json(workout);
  }

  // res.send("This workout document is deleted from database!"); cause error
};

// update a workout   :  actually me ye db me change hi nahi kar raha
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Enter a valid ObjectId" });
  }

  // ye us object ko update kar rah hai jo already deleted hai; ya tha hi nahi ":) ha ha ha"
  // actually humne is controller ko export hi nahi kiya : lol
  // jab export kiya aur router mein import kiya ; then worked as expected

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    // { new: true }, deprecated
    { returnDocument: "after" },
  );

  if (!workout) {
    return res.status(404).json({ error: "No such Workout" });
  }

  res.status(200).json(workout);
  // res.send("workout document updated successfully"); causing error
  // ERR_HTTP_HEADERS_SENT
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
