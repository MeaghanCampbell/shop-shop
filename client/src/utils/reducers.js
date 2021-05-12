// a reaect hook that will that will know how to take in our state and update it with our reducer function
import { useReducer } from 'react';

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
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

      case ADD_TO_CART:
          return {
              ...state,
              // set this so users can immediately view cart with newly added item
              cartOpen: true,
              // preserve everything else in state, update cart property and add action.product to end of array
              cart: [...state.cart, action.product]
          }

        case ADD_MULTIPLE_TO_CART:
          return {
            ...state,
            cart: [...state.cart, ...action.products],
          };

        case REMOVE_FROM_CART:
            // filter method only keeps the items that don't match the provided _id property
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
                })
            };
        
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            }
  
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