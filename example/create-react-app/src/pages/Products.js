import React, { useEffect } from 'react';
import { connect } from 'pure-dva';

function ProductList({
  products,
  dispatch
}) {
  useEffect(() => {
    dispatch({type: 'productsQuery'});
  }, [dispatch]);
  return (
    <div>
      <h2>Popular Products</h2>
      {
        products.loading ? 'loading' :
          products.list.map((product, index) => (
            <li key={index}>{product}</li>
          ))
      }
    </div>
  );
}
const MainView = connect(({products}) => ({products}))(ProductList);

export default MainView;