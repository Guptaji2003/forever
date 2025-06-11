import React, { useState } from "react";
import ResultProducts from "./ResultProducts";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivals } from "../redux/slice/productSlice";

const NewArrival = () => {
  const {newArrivals } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  return (
    <div>
      <div className="container mx-auto mt-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">New Arrivals</h2>
        <p className="text-center mb-12">
          Our new arrivals are built to withstand your activities while keeping
          you looking your best!
        </p>
        <ResultProducts array={newArrivals} />
      </div>
    </div>
  );
};

export default NewArrival;
