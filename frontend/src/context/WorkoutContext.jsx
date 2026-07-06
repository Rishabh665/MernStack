// context and context provider component

import { createContext, useReducer } from "react";

// custom contextprovider
export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  // state = {workouts:null} <-- obj

  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts], // which is gonna be a single new workout object, ... currentState.property; local state
      };

      case "DELETE_WORKOUT" :
        return{
          workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
        }

    default:
      return state;
  }
};

// custom provider component
export const WorkoutsContextProvider = ({ children }) => {
  // instead of useState we use

  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  // dispatch({type:"SET_WORKOUTS", payload:[{},{}]}); // iske andar jo argument hai usko kehten hai "action" = obj
  return (
    // this thing below comes from line 6.
    <WorkoutsContext.Provider value={{...state,dispatch}}>
        {children}
    </WorkoutsContext.Provider>
  );
};
