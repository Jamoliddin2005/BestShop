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
  categories,
  setCategories,
  loading,
  setLoading,
}) {
  return (
    <div className="about">
      <Header />
      <Section
        loading={loading}
        setLoading={setLoading}
        categories={categories}
        setCategories={setCategories}
        getCategory={getCategory}
        categoryBig={categoryBig}
        setCategoryBig={setCategoryBig}
      />
      <NewProducts ProductMore={ProductMore} />
    </div>
  );
}

export default Home;
