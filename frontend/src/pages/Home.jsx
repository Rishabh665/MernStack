import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import DeleteWorkout from "../components/DeleteWorkout";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);

  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/getWorkouts"); // cors origin ki jugad during development ,
      // this trick only work of CRA, proxy:"localhost of backend server" in frontend package.json
      // for vite

      const json = await response.json(); // this is for parsing fetched data into json

      // check if the response is ok using "ok" property

      if (response.ok) {
        // setWorkouts(json); // json gone be array of workout documents (objects)

        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);  // although i don't face any error in vite during date-fns; but i feel adding dependency to useEffect here is good practice;

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return (
              <div>
                <WorkoutDetails key={workout._id} workout={workout} />
                {/* <DeleteWorkout objId={workout._id}/> */}
                {console.log(workout)}
              </div>
            );
          })}
      </div>

      <div className="form-container">
        <WorkoutForm />
        {/* <div className="space-right"></div> */}
      </div>
    </div>
  );
};

export default Home; // usually parent passed the data through props in the component  property = {value} ; here workoutProp = {workout} // state value
