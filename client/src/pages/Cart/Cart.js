import React from "react";
import classes from "./Cart.module.css";

function Cart() {
  const ProductCart =
    localStorage.getItem("productsInCart") &&
    Object.values(JSON.parse(localStorage.getItem("productsInCart"))).find(
      (x) => x._id === productMore._id
    );

  return (
    <div className={classes.Cart}>
      <div className="container">
        <div className="row">
          {ProductCart ? (
            <>
              <div className={classes.cartLeft}></div>
              <div className={classes.cartRight}></div>
            </>
          ) : (
            <div className={classes.empty}>
                
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
