import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const carouselArr = [
  {
    id: 1,
    name: "chồng người ta",
    imgLink: "img/carousel_1.png",
    clipStatus: true,
    videoLink: "",
  },
  {
    id: 2,
    name: "tiệc trăng máu",
    imgLink: "img/carousel_2.png",
    clipStatus: true,
    videoLink: "",
  },
  {
    id: 3,
    name: "phim hay tuần này",
    imgLink: "img/carousel_3.jpg",
    clipStatus: false,
    videoLink: "",
  },
  {
    id: 4,
    name: "bí mật của gió",
    imgLink: "img/carousel_4.jpg",
    clipStatus: true,
    videoLink: "",
  },
  {
    id: 5,
    name: "săn vé 1k",
    imgLink: "img/carousel_5.jpg",
    clipStatus: false,
    videoLink: "",
  },
];

//handle css by SCSS in scss folder
export default function CarouselHome() {
  const renderSlide = () => {
    return carouselArr.map((item, index) => {
      return (
        <SwiperSlide
          key={`slide-${index}`}
          tag="li"
          style={{ listStyle: "none" }}
        >
          <img src={item.imgLink} alt={item.name} />
        </SwiperSlide>
      );
    });
  };

  return (
    <div className="carousel__home">
      <Swiper
        id="main"
        tag="section"
        wrapperTag="ul"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {renderSlide()}
      </Swiper>
    </div>
  );
}
