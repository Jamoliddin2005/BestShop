import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import classes from "./ProductMore.module.css";
import Truth from "./Truth"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import axios from "axios";
import Currency from "../../components/Currency/Currency";

const ProductMore = ({ productMore, setProductMore, user }) => {
  const [loading, setLoading] = useState(false);
  const [savetoCart, setSavetoCart] = useState(0);
  const [activeImage, setImageActive] = useState(null)
  const [truth, setTruth] = useState(false)

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
        `${process.env.REACT_APP_URL}/add/` + Winlocation
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
  };


  return (
    <div className={classes.ProductMore}>
      <div className={classes.container}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={classes.row}>
              <div className={classes.left}>
                <div className={classes.Left_left}>
                  {productMore.photo ? productMore.photo.map((item, index) => (
                    <div className={classes.images_nth} key={index} onClick={(e) => {
                      setImageActive(item)
                      window.scroll(0, 0);
                    }}>
                      <img src={"/uploads/" + item} alt="" width={"100%"} />
                    </div>
                  )) : ""}

                </div>
                <div className={classes.Left_Right}>
                  <TransformWrapper>
                    <TransformComponent>
                      {activeImage !== null ? <img
                        src={"/uploads/" + activeImage}
                        alt=""
                        className={classes.img}
                      /> : <img
                        src={"/uploads/" + productMore.photo[0]}
                        alt=""
                        className={classes.img}
                      />}
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              </div>

              <div className={classes.right}>
                <h2 className={classes.name}>{productMore.name}</h2>
                <h4 className={classes.price}>{Currency(productMore.price)}</h4>
                <div className={classes.description}>
                  <h3 className={classes.desc_title}>Description:</h3>
                  <p className={classes.desc}>{productMore.desc}</p>
                </div>
                <div className={classes.buttons}>
                  <button className={classes.buttonBuy} onClick={() => {
                    setTruth(true)
                  }}>Buy</button>
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

          </>
        )}
      </div>
      {truth ? <div className={classes.Bg_Truth} onClick={() => {
        setTruth(false)
      }}></div> : ""}
      {truth ? <Truth user={user} truth={truth} setTruth={setTruth} productMore={productMore} /> : ""}
    </div>
  );
};

export default ProductMore;
