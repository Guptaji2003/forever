import React from "react";
import HeroSlider from "./HeroASlider";

const Hero = () => {
  return (
    <div className="w-full pt-20 md:pt-24 bg-gray-50 overflow-hidden">
      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left Text Section */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">Your Brand</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover our exclusive collection and grab the latest fashion trends today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
              Shop Now
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
              Explore
            </button>
          </div>
        </div>

        {/* Right Slider/Visual Section */}
        <div className="flex-1 w-full">
          <HeroSlider />
        </div>
      </div>
    </div>
  );
};

export default Hero;
