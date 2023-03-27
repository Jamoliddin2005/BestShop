import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import Loading from "../../../../components/Loading/Loading";
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import "swiper/modules/navigation/navigation.min.css";

SwiperCore.use([Autoplay]);
const HomeCarousel = ({ setErrorServer }) => {
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
      try {
        setLoading(true);
        await fetch(`${process.env.REACT_APP_URL}/add/show`)
          .then(res => res.json())
          .then(response => setContacts(response))
          .catch(err => {
            setErrorServer(true)
          })
        setLoading(false);
      } catch (error) {
        if (error) {
          setErrorServer(true)
        }
      }
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
