import React from "react";
import IMG from '../assets/raamin-ka-74jERQtN1V4-unsplash.jpg'
const Hero = () => {
  return (
    <div className="w-full  py-30 ">
      <div className="border-1 bg-red-100 m-auto h-110 w-250 flex justify-between p-10">
        <h1 className="flex justify-center items-center text-7xl">FOREVER.com</h1>
        <div className=""><img src={IMG} width={300} alt="" /></div>
        
      </div>
    </div>
  );
};

export default Hero;
