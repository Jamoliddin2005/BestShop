import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Pagination, Navigation } from "swiper";
import Loading from "../../../../components/Loading/Loading";
import NameLength from "../../../../components/NameLength/NameLength";
import { Link } from "react-router-dom";

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
    <div className="container">
      <Swiper
        slidesPerView={1.1}
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
              <div className="row">
                <a href={item.link} target={"_blank"} rel="noreferrer">
                  <img
                    src={`/uploads/${item.post}`}
                    alt=""
                  />
                </a>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  ) : null;
};

export default HomeCarousel;
