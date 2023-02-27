import React from "react";
import Loading from "../../../components/Loading/Loading";
import classes from "./section.module.css";
import translate from "../../../components/translate/translate"

function Section({
  setCategoryBig,
  categoryBig,
  getCategory,
  categories,
  setCategories,
  loading,
  setLoading,
}) {
  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <h1 className={classes.h1}>{translate("Рус", "UZB")}</h1>
        <p className={classes.p}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className={classes.bottom_Categories}>
        <div className={classes.row}>
          {loading ? (
            <Loading />
          ) : (
            categories.map((item, index) => (
              <div className={classes.item} key={index}>
                <div
                  className={classes.images}
                  onClick={() => getCategory(item._id)}
                >
                  <img
                    className={classes.image}
                    src={"/uploads/" + item.photo}
                    alt=""
                  />
                </div>
                <h3 className={classes.h3}>{item.name}</h3>
                <button
                  className={classes.btn}
                  onClick={() => getCategory(item._id)}
                >
                  Go Shop
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Section;
