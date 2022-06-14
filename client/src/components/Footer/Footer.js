import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Footer.css";

const Abouts = [
  {
    icon: "fas fa-map-marker-alt fa-fw",
    name: "123 Consectetur at ligula 10660",
    hrefs: "/",
  },
  {
    icon: "fa fa-phone fa-fw",
    name: "+998946239777",
    hrefs: "tel:+998946239777",
  },
  {
    icon: "fa fa-envelope fa-fw",
    name: "jamoliddindev@gmail.com",
    hrefs: "mailto:jamoliddindev@gmail.com",
  },
];

const Products = [
  {
    name: "Luxury",
  },
  {
    name: "Sport Wear",
  },
  {
    name: "Men's Shoes",
  },
  {
    name: "Women's Shoes",
  },
  {
    name: "Popular Dress",
  },
  {
    name: "Gym Accessories",
  },
  {
    name: "Sport Shoes",
  },
];

const Pages = [
  {
    name: "Home",
  },
  {
    name: "About Us",
  },
  {
    name: "Shop Locations",
  },
  {
    name: "FAQs",
  },
  {
    name: "Contact",
  },
];

export default function Footer() {
  const [input, setInput] = useState({
    name: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setInput({ name: "" });
    const news = {
      name: input.name,
    };
    console.log(news);
    axios.post("/auth", news);
  };

  return (
    <div className="Footer">
      <div className="Footer_Top">
        <div className="container">
          <div className="row">
            <ul>
              <Link to="/" className="Home_Logo">
                <h3>Zay Shop</h3>
              </Link>
              {Abouts.map((item, index) => (
                <li key={index}>
                  <Link to={item.hrefs}>
                    <i className={item.icon}></i>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              <h3>Products</h3>
              {Products.map((item, index) => (
                <li key={index}>
                  <Link to={index}>{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul>
              <h3>Further Info</h3>
              {Pages.map((item, index) => (
                <li key={index}>
                  <Link to={index}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer_bottom">
            <ul>
              <li>
                <Link to="/">
                  <i className="fab fa-facebook-f fa-lg fa-fw"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fab fa-instagram fa-lg fa-fw"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fab fa-twitter fa-lg fa-fw"></i>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i className="fab fa-linkedin fa-lg fa-fw"></i>
                </Link>
              </li>
            </ul>
            <div className="form">
              <form action="/auth" onSubmit={submitHandler}>
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="Email address"
                  onChange={handleChange}
                  value={input.name}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
