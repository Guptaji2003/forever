import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResultProducts from "./ResultProducts";
import { fetchNewArrivals } from "../redux/slice/productSlice";

const NewArrival = () => {
  const dispatch = useDispatch();
  const { newArrivals } = useSelector((store) => store.product);

  // useEffect(() => {
  //   dispatch(fetchNewArrivals());
  // }, [dispatch]);

  return (
    <section data-aos="smooth" className="bg-white py-12 px-4 sm:px-6 lg:px-40">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          New Arrivals
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Our new arrivals are built to withstand your activities while keeping
          you looking your best!
        </p>

        <ResultProducts array={newArrivals} />
      </div>
    </section>
  );
};

export default NewArrival;
