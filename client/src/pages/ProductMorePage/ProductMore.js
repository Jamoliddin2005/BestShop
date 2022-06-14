import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import classes from "./ProductMore.module.css";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import axios from "axios";

const ProductMore = ({ productMore, setProductMore }) => {
  const [loading, setLoading] = useState(false);
  const [savetoCart, setSavetoCart] = useState(0);

  window.scroll(0, 0);

  const [localstorage, setLocalstorage] = useState([
    {
      _id: "",
      name: "",
      price: "",
      photo: "",
      desc: "",
      categoryId: "",
    },
  ]);

  useEffect(() => {
    const Winlocation = window.location.pathname;
    const CategoryFind = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/add/" + Winlocation
      );
      setProductMore(data.data);
      setLoading(false);
    };
    CategoryFind();
  }, []);

  const clickHandler = async (e) => {
    setSavetoCart(1);
    await setLocalstorage(productMore);
    await localStorage.setItem("product", localstorage);
    console.log(localstorage);
  };

  return (
    <div className={classes.ProductMore}>
      <div className={classes.container}>
        {loading ? (
          <Loading />
        ) : (
          <div className={classes.row}>
            <div className={classes.left}>
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={"/uploads/" + productMore.photo}
                    alt=""
                    className={classes.img}
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
            <div className={classes.right}>
              <h2 className={classes.name}>{productMore.name}</h2>
              <h4 className={classes.price}>{"$ " + productMore.price}</h4>
              <div className={classes.description}>
                <h3 className={classes.desc_title}>Description:</h3>
                <p className={classes.desc}>{productMore.desc}</p>
              </div>
              <div className={classes.buttons}>
                <button className={classes.buttonBuy}>Buy</button>
                {savetoCart > 0 ? (
                  <button className={classes.buttonBuyCartAdd}>
                    <div
                      className={classes.minus}
                      onClick={(e) => setSavetoCart(savetoCart - 1)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </div>
                    <div className={classes.center}>{savetoCart}</div>
                    <div
                      className={classes.plus}
                      onClick={(e) => setSavetoCart(savetoCart + 1)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </button>
                ) : (
                  <button
                    className={classes.buttonBuyCart}
                    onClick={clickHandler}
                  >
                    Save To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductMore;
