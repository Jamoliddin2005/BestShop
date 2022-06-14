import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../../../../components/Loading/Loading";
import { Pagination, Navigation } from "swiper";

function SwiperHead({ contacts, deleteCarousel, loading }) {
  return (
    <div className="carouselHome">
      <div className="carousel">
        {contacts.length ? (
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
                        <h1>{item.title}</h1>
                        <h3>{item.select.toString()}</h3>
                        <p>{item.desc}</p>
                        <div className="buttons admin">
                          <button onClick={(e) => deleteCarousel(item._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="right">
                        <img
                          src={`/uploads/${item.photo}`}
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
        ) : (
          <p>No products!</p>
        )}
      </div>
    </div>
  );
}

export default SwiperHead;
