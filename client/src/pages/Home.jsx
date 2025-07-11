import React from "react";
import Hero from "../components/Hero";
import Item from "../components/Item";
import { products } from "../assets/Product";
import NewArrival from "../components/NewArrival";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";

const Home = () => {
  // const {products}=useSelector(store=>store.product);
  return (
    <div >
      <Hero />
      <NewArrival/>
      <Banner/>
    </div>
  );
};

export default Home;
