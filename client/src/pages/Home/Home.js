import React from "react";
import Header from "./Header/Header";

import "./Home.css";
import NewProducts from "./NewProducts/NewProducts";
import Section from "./Section/Section";
function Home({
  setCategoryBig,
  categoryBig,
  getCategory,
  ProductMore,
  productMore,
}) {
  return (
    <div className="about">
      <Header />
      <Section
        getCategory={getCategory}
        categoryBig={categoryBig}
        setCategoryBig={setCategoryBig}
      />
      <NewProducts productMore={productMore} ProductMore={ProductMore} />
    </div>
  );
}

export default Home;
