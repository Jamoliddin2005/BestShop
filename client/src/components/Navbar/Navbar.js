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
    setToggle(!toggle);
  };

  return (
    <>
      <div className="navbar_top">
        <div className="container">
          <div className="row">
            <ul>
              <li>
                <a href="mailto:jamoliddindev@gmail.com">
                  <i className="fa-solid fa-envelope"></i>{" "}
                  jamoliddindev@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+998946239777">
                  <i className="fa-solid fa-phone"></i> +998942245606
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100078919103944"
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href="https://www.instagram.com/jamoliddin__05/"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href="https://t.me/BestShopWeb"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-telegram"></i>
                </a>
              </li>
              <li>
                <a
                  target={"_blank"}
                  href="https://www.linkedin.com/in/jamoliddin-ko-charov-8a6193234/"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <div className="container">
          <div className="row">
            <Link to="/" className="navbar_left">
              <img src="/uploads/logo.png" alt="" />
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
                  {user.avatar ? (
                    <img src={user.avatar} alt="" />
                  ) : (
                    <img src="/uploads/user.png" alt="" />
                  )}

                  {user.firstName ? user.firstName : user.phoneNumber}
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
                  <Link to={"/"}>
                    <i className="fa-solid fa-gear"></i>
                    Settings
                  </Link>
                  <span onClick={logout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Logout
                  </span>
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
                    <a
                      onClick={() => {
                        window.open("https://t.me/BestShopWeb");
                      }}
                      href="https://t.me/BestShopWeb"
                      target={"_blank"}
                      rel="noopener noreferrer"
                    >
                      Telegram
                    </a>
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
