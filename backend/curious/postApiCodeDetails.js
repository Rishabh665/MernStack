
// process asynchronous hai that's why using async await ;
// async makes a fn capable of performing asynchronous operations
// and automatically returns a Promise.

router.post("/new/addWorkout", async (req, res) => {

  //destructing to get payload data into variable from req object
  const { title, reps, load } = req.body;

  // try and catch block ka use karte hai , jab hum asia code likhe jisme error ki sambhavana ho
  // if error actually happen than catch block code runs handling
  // exceptions so that our program doesn't crash unexpectedly.
  // without try...catch, javascript would stop execution and display : bad request or some error..
  try {
    const workout = await Workout.create({title,reps,load});
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error : error.message})
  }

//   res
//     .status(201)
//     .json({
//       message: "new workout data added successfully",
//       id: "insertId from database",
//     });

});


// get api
router.get("/workout/:id", (req, res) => {
  // this thing interesting...
  const id = req.params.id; 
  res.json({ message: "single workout", foundById: id });
});