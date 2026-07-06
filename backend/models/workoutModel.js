const mongoose = require("mongoose"); // importing mongoose packages ; mongoose : (orm type like hibernate, prisma)

const Schema = mongoose.Schema; // storing mongoose Schema contructor function reference

const workoutSchema = new Schema(  // creating new Schema instance 
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// created model name is "Workout" here
const createdModel = mongoose.model("Workout", workoutSchema); 

// mongoose automatically converts it to a collection name:'workouts'

module.exports = createdModel;


