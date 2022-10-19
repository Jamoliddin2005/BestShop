import React, { useEffect, useState } from "react";
import Currency from "../../../components/Currency/Currency";
import Loading from "../../../components/Loading/Loading";
import NameLength from "../../../components/NameLength/NameLength";
import classes from "./NewProducts.module.css";
function NewProducts({ ProductMore }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([
    {
      name: "",
      price: "",
      desc: "",
      photo: "",
    },
  ]);

  useEffect(() => {
    const productBase = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/add/showProducts`);
      setProducts(await response.json());
      setLoading(false);
    };

    productBase();
  }, []);


  return (
    <div className={classes.NewProducts}>
      <div className={classes.container}>
        <div className={classes.top}>
          <h1 className={classes.title}>New Products</h1>
          <p className={classes.description}>
            Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>
        {products.length ? (
          <div className={classes.newProds}>
            {loading ? (
              <Loading />
            ) : (
              products.map((item, index) => (
                <div
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
                      <h2 className={classes.name}>{NameLength(item.name, 6)}</h2>
                      <h3 className={classes.price}>{Currency(item.price)}</h3>
                    </div>
                    <p className={classes.desc}>{item.desc}</p>
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
