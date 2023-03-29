import React, { useEffect, useState } from "react";
import Currency from "../../../components/Currency/Currency";
import translate from "../../../components/translate/translate";
import Loading from "../../../components/Loading/Loading";
import NameLength from "../../../components/NameLength/NameLength";
import classes from "./NewProducts.module.css";
function NewProducts({ ProductMore, setErrorServer }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productBase = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/add/showProducts`);
        setProducts(await response.json());
      } catch (error) {
        setErrorServer(true)
      }
      setLoading(false);
    };

    productBase();
  }, []);

  console.log(products);
  return (
    <div className={classes.NewProducts}>
      <div className={classes.container}>
        <div className={classes.top}>
          <h1 className={classes.title}>{translate("Новые продукты", "Yangi mahsulotlar")}</h1>
        </div>
        {products.length > 0 ? (
          <div className={classes.newProds}>
            {loading ? (
              <Loading />
            ) : (
              products &&
              products.map((item, index) => (
                item.photo[0] && <div
                  className={classes.product}
                  key={index}
                  onClick={() => { ProductMore(item._id) }}
                >
                  <div className={classes.image}>
                    <img
                      src={"/uploads/" + item.photo[0]}
                      className={classes.img}
                      alt=""
                    />
                  </div>
                  <div className={classes.texts}>
                    <div className={classes.price__name}>
                      <h2 className={classes.name}>{translate(NameLength(item.name_ru, 30), NameLength(item.name_uz, 30))}</h2>
                      <h3 className={classes.price}>{Currency(item.price)}</h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default NewProducts;
