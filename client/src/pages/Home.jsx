import React from "react";
import Hero from "../components/Hero";
import Item from "../components/Item";
import { products } from "../assets/Product";
import NewArrival from "../components/NewArrival";
import { useSelector } from "react-redux";

const Home = () => {
  // const {products}=useSelector(store=>store.product);
  return (
    <div>
      <Hero />
      <NewArrival/>
    </div>
  );
};

export default Home;
