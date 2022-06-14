import React from "react";
// import classes from "./Administrator.module.css";
import HomeCarousel from "../HomeCarousel/HomeCarousel";
import Categories from "../Categories/Categories";
import NewProducts from "../NewProducts/NewProducts";

const Administrator = ({
  categoryBig,
  setCategoryBig,
  categoryLoading,
  setCategoryLoading,
  getCategory,
  ProductMore,
  user,
  loading,
  contacts,
  setLoading,
  setContacts,
}) => {
  return (
    <div>
      <div className="adminPage">
        <div className="adminTitle">
          <h1>Welcome {user.firstName}</h1>
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
    </div>
  );
};

export default Administrator;
