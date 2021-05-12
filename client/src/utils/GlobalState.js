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

//instantiate our global state with useProductReducer from reducers.js that wraps around the userReducer() function from react
// when we run this useProductReducer receives state (up to date global state) and dispatch (method we execute to update our state)
// StoreProvider acts as a custom <Provider> component set up to accept props if needed
// this will wrap our other components so props.children will be the other component
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    })
    console.log(state)
    // then we return the StoreContext's provider component with our state object and dispatch the function provided as data for the value prop
    return <Provider value={[state, dispatch]} {...props} />
}

// useContext hook will be used by the components that need the data our <StoreProvider> will be providing
// we created our own custom react hook
const useStoreContext = () => {
    return useContext(StoreContext)
}

// we can use useStoreContext to grab the state from <StoreProvider> component and use the returning dispatch method to update it
export { StoreProvider, useStoreContext }