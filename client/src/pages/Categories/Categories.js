import axios from "axios";
import React, { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import classes from "./Categories.module.css";

const Categories = ({
  categoryBig,
  categoryLoading,
  setCategoryLoading,
  setCategoryBig,
  ProductMore,
}) => {
  useEffect(() => {
    const CategoryFind = async () => {
      const location = window.location.pathname;
      setCategoryLoading(true);
      const { data } = await axios.get("http://localhost:5000/add/" + location);
      setCategoryLoading(false);
      setCategoryBig(data.data);
    };
    CategoryFind();
  }, []);

  window.scroll(0, 0);

  return (
    <div className={classes.Categories}>
      <div className={classes.container}>
        <div className={classes.row}>
          {categoryBig.length ? (
            categoryLoading ? (
              <Loading />
            ) : (
              categoryBig.map((item, index) => (
                <div
                  key={index}
                  className={classes.product}
                  onClick={() => ProductMore(item._id)}
                >
                  <div className={classes.image}>
                    <img
                      src={"/uploads/" + item.photo}
                      className={classes.img}
                      alt=""
                    />
                  </div>
                  <div className={classes.texts}>
                    <div className={classes.price_name}>
                      <h2 className={classes.name}>{item.name}</h2>
                      <h3 className={classes.price}>{"$ " + item.price}</h3>
                    </div>
                    <div className={classes.desc}>
                      <p className={classes.desc}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <h2>Bu Categoriyada mahsulot yo'q</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
