// creating a template for workout data

import { useWorkoutsContext } from "../hooks/useWorkoutContext";

// import date-fns function

import formatDistanceToNow from "date-fns/formatDistanceToNow"


const WorkoutDetails = ({workout}) =>{

    const {dispatch} = useWorkoutsContext();

   const handleClick = async () => {
      
    try{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/deleteWorkout/${workout._id}`,{method:"DELETE"});
        const json = await response.json();

        if(response.ok){
            dispatch({type:"DELETE_WORKOUT",payload:json})
        }
    }catch(error){
        console.log(error.message)
    }

   }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{" "+ workout.load}</p>
            <p><strong>Reps:</strong>{" "+ workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}
export default WorkoutDetails;