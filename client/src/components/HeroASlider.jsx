import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    heading: "Upgrade Your Style",
    subtext: "Discover new arrivals every week",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67ddaf",
    heading: "Trendy Collection",
    subtext: "For men, women & kids",
    cta: "Explore",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1602810319056-0e37aebfc8c5",
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
              style={{ backgroundImage: `url('${banner.image}')` }}
            >
              <div className="bg-black bg-opacity-60 w-full h-full flex items-center px-10 md:px-20">
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
