import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user }) {
  const logout = () => {
    window.open("http://localhost:5000/auth/login/logout", "_self");
  };

  const [isActive, setActive] = useState("false");
  const [toggle, setToggle] = useState("false");
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wordEntered, setWordEntered] = useState("");
  const [searchDivBg, setSearchDivBg] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([
    {
      name: "",
      price: "",
      desc: "",
      photo: "",
    },
  ]);

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

  const SearchHandler = (e) => {
    setSearch(true);
    productBase();
  };

  const productBase = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/add/showProducts");
    setProducts(await response.json());
    setLoading(false);
  };

  const SearchChangeHandler = (e) => {
    setSearchDivBg(true);
    productBase();
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = products.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
      setSearchDivBg(false);
    } else {
      setFilteredData(newFilter);
    }
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
          {searchDivBg ? (
            <div
              className="navbar_search_bg"
              onClick={(e) => {
                setSearch(false);
                setSearchDivBg(false);
                setFilteredData([]);
                setWordEntered("");
              }}
            ></div>
          ) : (
            ""
          )}

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
                {window.location.href.split("/")[3] !== "product" ? (
                  <li>
                    <Link
                      to="#"
                      className={
                        search ? "Search-item border_left" : "Search-item"
                      }
                      onClick={SearchHandler}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    {search ? (
                      <div className="search-input">
                        <input
                          onChange={SearchChangeHandler}
                          value={wordEntered}
                          type="text"
                          placeholder="Search..."
                          name=""
                          id=""
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {filteredData.length !== 0 && (
                      <div className="dataResult">
                        {filteredData.slice(0, 15).map((value, key) => {
                          return (
                            <Link
                              to={`/product/more/${value._id}`}
                              className="dataItem"
                              href={value.link}
                              key={key}
                              onClick={(e) => {
                                setSearch(false);
                                setSearchDivBg(false);
                                setFilteredData([]);
                                setWordEntered("");
                              }}
                            >
                              <p>{value.name} </p>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                ) : (
                  ""
                )}

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
                {window.location.href.split("/")[3] !== "product" ? (
                  <li>
                    <Link
                      to="#"
                      className={
                        search ? "Search-item border_left" : "Search-item"
                      }
                      onClick={SearchHandler}
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    {search ? (
                      <div className="search-input">
                        <input
                          onChange={SearchChangeHandler}
                          value={wordEntered}
                          type="text"
                          placeholder="Search..."
                          name=""
                          id=""
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {filteredData.length !== 0 && (
                      <div className="dataResult">
                        {filteredData.slice(0, 15).map((value, key) => {
                          return (
                            <Link
                              to={`/product/more/${value._id}`}
                              className="dataItem"
                              href={value.link}
                              key={key}
                              onClick={(e) => {
                                setSearch(false);
                                setSearchDivBg(false);
                                setFilteredData([]);
                                setWordEntered("");
                              }}
                            >
                              <p>{value.name} </p>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                ) : (
                  ""
                )}
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
