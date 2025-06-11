import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResultProducts from "../components/ResultProducts";
// import UseAddToCart from "../hooks/UseAddToCart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelatedProducts,
  fetchSingleProduct,
} from "../redux/slice/productSlice";

const ProductDetail = () => {
  const {id}=useParams();
  const { relatedProducts, singleProduct,loading } = useSelector(
    (store) => store.product
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchSingleProduct(id));
    dispatch(fetchRelatedProducts(id));
  }, [dispatch,id]);

  return (
    <div>
      {loading?"Loading":
      (<div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            {/* <img
              src={singleProduct.image}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-lg"
            /> */}
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {singleProduct?.name}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              ${singleProduct?.price}
            </p>
            <p className="text-base text-gray-700 mb-6">
              {singleProduct?.description}
            </p>

            <button
              className={`w-full md:w-auto px-6 py-3 "bg-green-600 text-white"  text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300`}
            >
              {singleProduct?.category}
            </button>

            <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Product Features
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-gray-700">Feature 1: High-quality material</li>
            <li className="text-gray-700">Feature 2: Stylish design</li>
            <li className="text-gray-700">Feature 3: Comfortable fit</li>
          </ul>
        </div>
      </div>)}

      <hr className="w-300 text-gray-400 m-auto" />
      <h2 className="text-3xl font-bold text-center mt-10 mb-6">
        Related Products
      </h2>
      <p className="text-center mb-12">
        Our new arrivals are built to withstand your activities while keeping
        you looking your best!
      </p>
      <ResultProducts array={relatedProducts} />
    </div>
  );
};

export default ProductDetail;
