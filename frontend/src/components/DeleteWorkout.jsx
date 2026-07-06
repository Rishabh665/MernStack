import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const DeleteWorkout = ({ objId }) => {
  const [error, setError] = useState(null);
  const {dispatch} = useWorkoutsContext();

  const handleClick = async () => {
    const workoutId = objId;
    // typo be aware ok!

    try {
      const response = await fetch("/api/deleteWorkout/"+ objId, {
        method: "DELETE"
      });
       
  

      if (response.ok) {

        
        console.log("workout deleted successfully", objId);

        const afterDeleteResponse = await fetch("/api/getWorkouts");

        const json = await afterDeleteResponse.json();

        if(afterDeleteResponse.ok){

          dispatch({type:"SET_WORKOUTS",payload:json})

        }

        // dispatch({ type: "DELETE_WORKOUT", payload: json });
      }
    } catch (error) {
      setError({ message: error.message });
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Delete</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteWorkout;
