import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Admin from "./pages/Admin/Admin";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Categories from "./pages/Categories/Categories";
import ProductMorePage from "./pages/ProductMorePage/ProductMore";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryBig, setCategoryBig] = useState([
    {
      _id: "",
      name: "",
      price: "",
      photo: "",
      desc: "",
      categoryId: "",
    },
  ]);
  const [moreLoading, setMoreLoading] = useState(false);
  const [productMore, setProductMore] = useState({
    _id: "",
    name: "",
    price: "",
    photo: "",
    desc: "",
    categoryId: "",
  });

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  let navigate = useNavigate();
  const getCategory = async (id) => {
    setCategoryLoading(true);
    navigate("/category/" + id);
    const { data } = await axios.get(
      "http://localhost:5000/add/category/" + id
    );
    setCategoryBig(data.data);
    setCategoryLoading(false);
  };

  const ProductMore = async (id) => {
    setMoreLoading(true);
    navigate("/product/more/" + id);
    const { data } = await axios.get(
      "http://localhost:5000/add/product/more/" + id
    );
    setMoreLoading(false);
    setProductMore(data.data);
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              ProductMore={ProductMore}
              getCategory={getCategory}
              categoryBig={categoryBig}
              setCategoryBig={setCategoryBig}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/product/more/:id"
          element={
            <ProductMorePage
              setProductMore={setProductMore}
              productMore={productMore}
            />
          }
        />
        <Route
          path="/admin"
          element={
            user ? (
              <Admin
                ProductMore={ProductMore}
                getCategory={getCategory}
                user={user}
                categoryBig={categoryBig}
                setCategoryBig={setCategoryBig}
                categoryLoading={categoryLoading}
                setCategoryLoading={setCategoryLoading}
              />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/category/:id"
          element={
            <Categories
              moreLoading={moreLoading}
              setMoreLoading={setMoreLoading}
              setCategoryBig={setCategoryBig}
              user={user}
              categoryLoading={categoryLoading}
              setCategoryLoading={setCategoryLoading}
              categoryBig={categoryBig}
              ProductMore={ProductMore}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
