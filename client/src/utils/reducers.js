// a reaect hook that will that will know how to take in our state and update it with our reducer function
import { useReducer } from 'react';

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from "./actions";
  
// pass two things in:
    // current state object
    // action we are performing on the updated state, which can be broken in to type (type of action) and value (representative of the new data we want to use with the action)
export const reducer = (state, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
        return {
            // make copy of current state using spread operator
          ...state,
          // set products key to a value of the updated state spread across it
          products: [...action.products],
        };
      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
      case UPDATE_CATEGORIES:
          return {
              ...state,
              categories: [...action.categories]
          };

      case UPDATE_CURRENT_CATEGORY:
          return {
              ...state,
              currentCategory: action.currentCategory
          };
  
      // if it's none of these actions, do not update state at all and keep things the same!
      default:
        return state;
    }
};

// useProductReducer is used to help initialize our global state object and provide us with functionality ofr updating the state
// automatically runs state though our custom reducer function
// like a more indepth way of using useState
// https://reactjs.org/docs/hooks-reference.html#usereducer
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}