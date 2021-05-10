// createContext is used to initiate a new context object
// useContext us another react hook that will allow us to use the state created from the createContext function
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

// instantiate global object
// when we run createContext it creates a new context object
const StoreContext = createContext();
// every context object comes with two components: provider and consumer
// provider is a react component that we wrap our app in so it can make the state data that's passed into it as a prop available to all other components
// consumer is our means of grabbing and using the data that the provider holds
const { Provider } = StoreContext;