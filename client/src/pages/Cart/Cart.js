import React from "react";
import classes from "./Cart.module.css";
import translate from "../../components/translate/translate";
import { Link } from "react-router-dom";

function Cart() {
  const ProductCart =
    localStorage.getItem("productsInCart") &&
    Object.values(JSON.parse(localStorage.getItem("productsInCart")));

  return (
    <div className={classes.Cart}>
      <div className="container">
        <div className="row">
          {ProductCart.length > 0 ? (
            <>
              <div className={classes.cartLeft}></div>
              <div className={classes.cartRight}></div>
            </>
          ) : (
            <div className={classes.empty}>
              <img src="/uploads/emptyCart.png" alt="" />
              <h2>
                {translate(
                  "В корзине пока нет товаров",
                  "Savatda hozircha mahsulot yoʻq"
                )}
              </h2>
              <p>
                {translate(
                  "Начните с подборок на главной странице или найдите нужный товар через поиск                  ",
                  "Bosh sahifadagi to’plamlardan boshlang yoki kerakli mahsulotni qidiruv orqali toping"
                )}
              </p>
              <Link to={"/"} className={classes.btn}>
                {translate(" На главную", " Bosh sahifa")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
