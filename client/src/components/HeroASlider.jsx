import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ban1 from '../assets/_Beige & Black Modern Shadow Women Collection Promo Banner.png'
import ban2 from '../assets/_Beige & Soft Brown Simple Woman Fashion Collection Promo Banner Landscape.png'
import ban3 from '../assets/Black & White Simple Fashion Sale Banner.png'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
  {
    id: 1,
    image: ban1,
    heading: "Upgrade Your Style",
    subtext: "Discover new arrivals every week",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: ban2,
    heading: "Trendy Collection",
    subtext: "For men, women & kids",
    cta: "Explore",
  },
  {
    id: 3,
    image: ban3,
    heading: "Your Style, Your Way",
    subtext: "Affordable & fashionable",
    cta: "Get Started",
  },
];

const HeroSlider = () => {
  return (
    <div className="w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="w-full h-[90vh] bg-cover bg-center flex items-center"
              // style={{ backgroundImage: `url('${banner.image}')` }}
            >
              <img src={banner.image} alt="" />
              <div className=" bg-opacity-60 w-full h-full flex items-center px-10 md:px-20">
                <div className="text-white max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{banner.heading}</h1>
                  <p className="text-lg md:text-xl mb-6">{banner.subtext}</p>
                  <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition">
                    {banner.cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
