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
  categories,
  setCategories,
}) {
  return (
    <div className="about">
      <Header />
      <Section
        categories={categories}
        setCategories={setCategories}
        getCategory={getCategory}
        categoryBig={categoryBig}
        setCategoryBig={setCategoryBig}
      />
      <NewProducts productMore={productMore} />
    </div>
  );
}

export default Home;
