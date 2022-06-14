import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeCarousel.css";
import "react-toastify/dist/ReactToastify.css";
import SwiperHead from "./Swiper/Swiper";
import { toast } from "react-toastify";
import AddCar from "./addCarousel/AddCar";

function HomeCarousel({ user }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [select, setSelect] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState([
    {
      title: "",
      desc: "",
      select: "",
      photo: "",
    },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && desc && photo && contacts && select) {
      console.log(select);
      try {
        toast.success("Product Added!");
        e.preventDefault();
        const dataCreate = new FormData();
        const fileInput = document.querySelector(".photoinp");
        fileInput.value = "";
        dataCreate.append("title", title);
        dataCreate.append("desc", desc);
        dataCreate.append("select", select);
        dataCreate.append("photo", photo);
        setTitle("");
        setDesc("");
        const { data } = await axios.post(
          "http://localhost:5000/add/addCarouselHome",
          dataCreate
        );
        setContacts(data.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Mahsulotlarni to'liq kiriting!!!");
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/add/show");
      setContacts(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  const deleteCarousel = async (id) => {
    const response = window.confirm(`Bu mahsulot o'chirib yuborilsinmi?`);
    if (response) {
      toast.success("Product Deleted!");
      const { data } = await axios.delete(
        "http://localhost:5000/delete/headerCarousel/delete/" + id
      );
      setContacts(data.data);
    }
  };

  return (
    <>
      <div className="CarouselHomeHeaderBigDiv">
        <div className="headerCarousel">
          <h3>Home Header Carousel</h3>
          <AddCar
            title={title}
            setTitle={setTitle}
            desc={desc}
            setDesc={setDesc}
            setSelect={setSelect}
            select={select}
            setPhoto={setPhoto}
            handleSubmit={handleSubmit}
          />
        </div>
        <SwiperHead
          contacts={contacts}
          deleteCarousel={deleteCarousel}
          loading={loading}
        />
      </div>
    </>
  );
}

export default HomeCarousel;
