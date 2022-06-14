import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar({ user }) {
  const logout = () => {
    window.open("http://localhost:5000/auth/login/logout", "_self");
  };

  const [isActive, setActive] = useState("false");
  const [toggle, setToggle] = useState("false");

  const RegisterClickHandler = (e) => {
    e.preventDefault();
    setActive(!isActive);
  };

  const DisabledClickHandler = (e) => {
    e.preventDefault();
    setActive(!isActive);
  };

  const DropdownAdmin = (e) => {
    e.preventDefault();
    setToggle(!toggle)
  };
  const AdminPage = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div className="navbar_top">
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <Link to="mailto:jamoliddindev@gmail.com">
                  <i className="fa-solid fa-envelope"></i>{" "}
                  jamoliddindev@gmail.com
                </Link>
              </li>
              <li>
                <Link to="tel:+998946239777">
                  <i className="fa-solid fa-phone"></i> +998946239777
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link to="">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link to="">
                  <i className="fa-brands fa-telegram"></i>
                </Link>
              </li>
              <li>
                <Link to="">
                  <i className="fa-brands fa-linkedin"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <div className="container">
          <div className="row">
            <Link to="/" className="navbar_left">
              Zay
            </Link>
            <ul className="navbar_center">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <div
              className={isActive ? "d_none_div" : "disabled_bg"}
              onClick={DisabledClickHandler}
            ></div>
            {user ? (
              <ul className="navbar_right AdminRight">
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-cart-arrow-down"></i>
                    <span>0</span>
                  </Link>
                </li>
                <Link to="/admin" className="User">
                  <img src={user.avatar} alt="" />
                  {user.firstName}
                </Link>
                <div className="dropdownAdmin" onClick={DropdownAdmin}>
                  <div className="userIcon">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div className="downIcon">
                    <i className="fa-solid fa-sort-down"></i>
                  </div>
                </div>
                <div className={toggle ? "d_none_div" : "AdminIcon_logout"}>
                  <Link to={"/"} >
                  <i className="fa-solid fa-gear"></i>
                    Settings
                  </Link>
                  <span onClick={logout}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Logout</span>
                </div>
              </ul>
            ) : (
              <ul className="navbar_right">
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa-solid fa-cart-arrow-down"></i>
                    <span>0</span>
                  </Link>
                </li>
                <li className="registerClick" onClick={RegisterClickHandler}>
                  <div className="userIcon" onClick={RegisterClickHandler}>
                    <div className="userIcon">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="downIcon">
                      <i className="fa-solid fa-sort-down"></i>
                    </div>
                  </div>
                  <div className={isActive ? "register" : "register_clicked"}>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
