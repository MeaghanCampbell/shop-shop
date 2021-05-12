
import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

function ProductList() {
  // immediately execute useStoreContext to get current global state, and dispatch to update state
  const [state, dispatch] = useStoreContext();

  // destructure current category out to state
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  
  // use effect to wait for useQuery response to come in & tell reducer to update products action and save array of product data to global store
  useEffect(() => {
    if(data) {
      dispatch({
           type: UPDATE_PRODUCTS,
          products: data.products
        });
    }
    // when that's done useStoreContext executes again giving us the product data needed to display products to the page
  }, [data, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {/* retrieve products from state object */}
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;

