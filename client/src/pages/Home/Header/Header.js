import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HomeCarousel from "./HeaderCarousel/HomeCarousel";



export default function Header() {
  return (
    <>
      <div className="carousel">
        <HomeCarousel />
      </div>
    </>
  );
}
