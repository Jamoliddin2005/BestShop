import React from "react";
import { Link } from "react-router-dom";
// import classes from "./Administrator.module.css";

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
          {user.firstName ? (
            <h1>Welcome {user.firstName}</h1>
          ) : (
            <h1>Welcome {user.phoneNumber}</h1>
          )}

          <ul>
            <li>
              <Link to={"/admin/homePage"}>home</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Administrator;
