import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Footer.css";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

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

export default function Footer({ categories, Abouts, loading }) {
  const [input, setInput] = useState("");

  const TOKEN = "5597892555:AAEzeESTwhMim-4zLSZQjoGZSZ9Q4Niqles";
  const CHAT_ID = "-1001663787427";
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const submitHandler = async (e) => {
    e.preventDefault();
    let message = `<b>#BestShop</b>\n\n`;
    message += `<b>Email: </b> ${input}\n`;
    message += `<b>Time: </b> ${new Date().toLocaleString()}`;

    await axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        setInput("");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        return toast.success("Success!");
      });
  };

  return (
    <div className="Footer">
      <div className="Footer_Top">
        <div className="container">
          <div className="row">
            <ul>
              <Link to="/" className="Home_Logo">
                <img src="/uploads/greenlogo.png" alt="" />
              </Link>
              {Abouts.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.hrefs}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <i className={item.icon}></i>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="footer_center">
              <h3>Products</h3>
              {loading ? (
                <Loading />
              ) : (
                <Loading />
              )}
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
            <div className="form">
              <form action="/auth" onSubmit={submitHandler}>
                <input
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  autoComplete="off"
                  required={true}
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
