import React from "react";

const Banner = () => {
  return (
  <div data-aos="fade-up" className="px-50 mb-30">
     <div className="relative bg-black text-pink-400 py-20 px-6 flex items-center justify-center overflow-hidden">
      {/* Glass background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-black/90 backdrop-blur-sm"></div>

      {/* Animated pink glow border */}
      <div className="absolute inset-0 border-4 border-pink-500 rounded-xl animate-pulse blur-md opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-white">
          Mega <span className="text-pink-500 animate-pulse">SALE</span> is Live!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-pink-300">
          Get up to <span className="text-pink-400 font-semibold text-2xl">80% OFF</span> on our Forever Collection
        </p>
        <button className="mt-6 bg-pink-500 text-black font-bold px-8 py-3 rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105 shadow-lg shadow-pink-500/30">
          Shop the Sale
        </button>
      </div>
    </div>
  </div>
  );
};

export default Banner;
