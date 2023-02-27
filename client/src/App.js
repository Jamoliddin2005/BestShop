import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Categories from "./pages/Categories/Categories";
import ProductMorePage from "./pages/ProductMorePage/ProductMore";
import axios from "axios";
import Contact from "./pages/Contact/Contact";
import AdminHome from "./pages/Admin/Administrator/Home/Home";
import Shop from "./pages/Shop/Shop";

function App() {
  const [user, setUser] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const GetTranslate = () => {
    if (window.localStorage.getItem("language") === null || window.localStorage.getItem("language") !== "uz" && window.localStorage.getItem("language") !== "ru") {
      window.localStorage.setItem("language", "uz")
    }
  }

  useEffect(() => {
    GetTranslate()
  }, [])

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

  const [categories, setCategories] = useState([
    {
      name: "",
      photo: "",
    },
  ]);

  const Abouts = [
    {
      icon: "fas fa-map-marker-alt fa-fw",
      name: "Uzbekistan / Almalik",
      hrefs: "https://www.google.com/maps/@40.8422655,69.6106512,21z",
    },
    {
      icon: "fa fa-phone fa-fw",
      name: "+998942245606",
      hrefs: "tel:+998942245606",
    },
    {
      icon: "fa fa-envelope fa-fw",
      name: "jamoliddindev@gmail.com",
      hrefs: "mailto:jamoliddindev@gmail.com",
    },
  ];

  const [contacts, setContacts] = useState([
    {
      name: "",
      photo: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/add/showCategory`);
      setCategories(await response.json());
      setLoading(false);
    };
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_URL}/add/showCategory`);
    setContacts(await response.json());
    setLoading(false);
  };
  useEffect(() => {
    getCategories();

  }, []);

  useEffect(() => {
    const getUser = () => {
      fetch(`${process.env.REACT_APP_URL}/auth/login/success`, {
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
          return toast.error("ERROR!!!")
        });

      fetch(`${process.env.REACT_APP_URL}/isAdmin`, {
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
          if (resObject.data.user) {
            setUser(resObject.data.user);
          }
        })
        .catch((err) => {
          return toast.error("ERROR!!!")
        });
    };
    getUser();
  }, []);

  let navigate = useNavigate();
  const getCategory = async (id) => {
    setCategoryLoading(true);
    navigate("/category/" + id);
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/add/category/` + id
    );
    setCategoryBig(data.data);
    setCategoryLoading(false);
  };

  const ProductMore = async (id) => {
    setMoreLoading(true);
    navigate("/product/more/" + id);
    const { data } = await axios.get(
      `${process.env.REACT_APP_URL}/add/product/more/` + id
    );
    setMoreLoading(false);
    setProductMore(data.data);
  };



  return (
    <div className="App" onCopy={(e) => e.preventDefault()}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
              loading={loading}
              setLoading={setLoading}
              categories={categories}
              setCategories={setCategories}
              ProductMore={ProductMore}
              getCategory={getCategory}
              categoryBig={categoryBig}
              setCategoryBig={setCategoryBig}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" /> : <Login user={user} setUser={setUser} />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/product/more/:id"
          element={
            <ProductMorePage
              user={user}
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
                Abouts={Abouts}
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop loading={loading} categories={categories} />} />
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
        <Route
          path="/admin/homePage"
          element={
            user ? (
              <AdminHome
                categoryBig={categoryBig}
                setCategoryBig={setCategoryBig}
                categoryLoading={categoryLoading}
                setCategoryLoading={setCategoryLoading}
                getCategory={getCategory}
                ProductMore={ProductMore}
                user={user}
                loading={loading}
                contacts={contacts}
                setLoading={setLoading}
                setContacts={setContacts}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Footer categories={categories} Abouts={Abouts} loading={loading} />
    </div>
  );
}

export default App;
