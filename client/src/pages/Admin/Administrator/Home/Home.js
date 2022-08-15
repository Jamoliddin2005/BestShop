import React from "react";
import HomeCarousel from "../../HomeCarousel/HomeCarousel";
import Categories from "../../Categories/Categories";
import NewProducts from "../../NewProducts/NewProducts";
import { AiOutlineRight } from "react-icons/ai";

import "../Administrator.module.css";

function Home({
  user,
  getCategory,
  setContacts,
  loading,
  setLoading,
  contacts,
  ProductMore,
  categoryLoading,
  setCategoryLoading,
  categoryBig,
  setCategoryBig,
}) {
  return (
    <div className="adminPage">
      <p>
        {" "}
        Admin <AiOutlineRight /> Home Page{" "}
      </p>
      <div className="adminTitle">
        <h1>Home Page for Admin</h1>
        <HomeCarousel user={user} />
        <Categories
          getCategory={getCategory}
          categoryLoading={categoryLoading}
          setCategoryLoading={setCategoryLoading}
          categoryBig={categoryBig}
          setCategoryBig={setCategoryBig}
          user={user}
          loading={loading}
          setLoading={setLoading}
          contacts={contacts}
          setContacts={setContacts}
        />
        <NewProducts
          user={user}
          loading={loading}
          setLoading={setLoading}
          contacts={contacts}
          setContacts={setContacts}
          ProductMore={ProductMore}
        />
      </div>
    </div>
  );
}

export default Home;
