import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import classes from "./section.module.css";

function Section({ setCategoryBig, categoryBig, getCategory }) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    {
      name: "",
      photo: "",
    },
  ]);

  const [color, setColor] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/add/showCategory");
      setCategories(await response.json());
      setLoading(false);
    };
    getCategories();
  }, []);

  return (
    <div className={classes.container} style={{ background: color }}>
      <input
        type={"color"}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <div className={classes.top}>
        <h1 className={classes.h1}>Categories of The Month</h1>
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