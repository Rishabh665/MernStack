import { useState } from "react";

import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import ErrorPopup from "./ErrorPopup";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [errorPopup, setErrorPopup] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    // typo be aware ok!
    const response = await fetch("/api/new/addWorkout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleLoad = (e) => {
    const value = e.target.value;

    if (isNaN(value)) {  // type === "string" will not work because in react every input is string ; later on it changes in schema
      setErrorPopup([...errorPopup,"load"]);
    }

    setLoad(e.target.value);
  };

  const handleReps = (e) => {
    const value = e.target.value;

    if (isNaN(value)) {
      setErrorPopup([...errorPopup,"reps"]);
    }
    setReps(e.target.value);
  };

  const handleClick = (fieldId) => {
    setErrorPopup([]);

    if (fieldId === "reps") {
      setReps("");
    }

    if (fieldId === "load") {
      setLoad("");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>
        Excercise Title:
        <input
          type="text"
          onChange={(e) => handleTitle(e)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""} // dynamic className : error handling
        />
      </label>

      <label>
        Load (in kg):
        <input
          // type="number"
          onChange={(e) => handleLoad(e)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""} // dynamic className : error handling
        />
        {errorPopup.includes("load") && (
          <div className="popup">
            <ErrorPopup id={"load"} />{" "}
            <button onClick={() => handleClick("load")}>x</button>
          </div>
        )}
      </label>

      <label>
        Reps:
        <input
          // type="number"
          onChange={(e) => handleReps(e)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""} // dynamic className : error handling
        />
        {errorPopup.includes("reps") && (
          <div className="popup">
            <ErrorPopup id={"reps"} />{" "}
            <button onClick={() => handleClick("reps")}>x</button>
          </div>
        )}
      </label>
      <div>
        <button>Add</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default WorkoutForm;
