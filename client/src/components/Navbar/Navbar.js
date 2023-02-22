import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import NameLength from "../NameLength/NameLength";
import Currency from "../Currency/Currency";

function Navbar({ user }) {
  const logout = () => {
    localStorage.removeItem("profileNumber");
    window.open(`${process.env.REACT_APP_URL}/auth/login/logout`, "_self");
  };

  const [isActive, setActive] = useState("false");
  const [toggle, setToggle] = useState("false");
  const [search, setSearch] = useState(false);
  const [setLoading] = useState(false);
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
    const response = await fetch(
      `${process.env.REACT_APP_URL}/add/showProducts`
    );
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
          <div className="row">
            <Link to="/" className="navbar_left">
              <span>Mongo.uz</span>
            </Link>
            <ul
              className={`${
                user ? "navbar_center navbar_user_center" : "navbar_center"
              }`}
            >
              <div className="inputSearch">
                <input
                  type="Search"
                  placeholder="Mahsulotlar va turkumlar izlash"
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 29 29"
                    xmlSpace="preserve"
                  >
                    <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z" />
                    <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z" />
                  </svg>
                </button>
              </div>
            </ul>
            {user ? (
              <ul className="navbar_right AdminRight">
                <li>
                  <Link to={"/"}>
                    <i className="fa-regular fa-heart"></i>
                    <span>0</span>
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
                  <Link to={"/"}>
                    <i className="fa-regular fa-heart"></i>
                    <span>0</span>
                    <p>Sevimlilar</p>
                  </Link>
                </li>

                <li>
                  <Link to="/">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="slightly transparent"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 6.5C9 4.88779 10.2402 3.5 12 3.5C13.7598 3.5 15 4.88779 15 6.5V7.5H9V6.5ZM7.5 9V11.5H9V9H15V11.5H16.5V9H18.5V19.75C18.5 20.1642 18.1642 20.5 17.75 20.5H6.25C5.83579 20.5 5.5 20.1642 5.5 19.75V9H7.5ZM7.5 7.5V6.5C7.5 4.11221 9.35984 2 12 2C14.6402 2 16.5 4.11221 16.5 6.5V7.5H19.25H20V8.25V19.75C20 20.9926 18.9926 22 17.75 22H6.25C5.00736 22 4 20.9926 4 19.75V8.25V7.5H4.75H7.5Z"
                        fill="#141415"
                      ></path>
                    </svg>
                    <span>0</span>
                    <p>Savat</p>
                  </Link>
                </li>
                <li className="registerClick">
                  <Link to={"/login"}>
                    <i className="fa-regular fa-user"></i>
                    <p>Kirish</p>
                  </Link>
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
