import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Pagination, Navigation } from "swiper";
import Loading from "../../../../components/Loading/Loading";
import NameLength from "../../../../components/NameLength/NameLength"
import { Link } from "react-router-dom"

SwiperCore.use([Autoplay]);

const HomeCarousel = () => {
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState([
    {
      title: "",
      desc: "",
      select: "",
      photo: "",
    },
  ]);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/add/show`);
      setContacts(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  return contacts.length ? (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      effect="coverflow"
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {loading ? (
        <Loading />
      ) : (
        contacts.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="container">
              <div className="row">
                <div className="left">
                  <h1>{NameLength(item.title, 27)}</h1>
                  <h3>{item.select}</h3>
                  <p>{NameLength(item.desc, 200)}</p>
                  {item.categoryId ? <Link to={`/category/${item.categoryId}`}>Shopping</Link> : ""}
                </div>
                <div className="right">
                  <img
                    src={"/uploads/" + item.photo}
                    className="image"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  ) : null;
};

export default HomeCarousel;
