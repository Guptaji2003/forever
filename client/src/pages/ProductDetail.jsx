import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResultProducts from "../components/ResultProducts";
// import UseAddToCart from "../hooks/UseAddToCart";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelatedProducts,
  fetchSingleProduct,
} from "../redux/slice/productSlice";
import { addToCart } from "../redux/slice/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const { relatedProducts, singleProduct, loading } = useSelector(
    (store) => store.product
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchSingleProduct(id));
    dispatch(fetchRelatedProducts(id));
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              <img
                // width={300}
                src={singleProduct?.image?.[0]?.url}
                alt={singleProduct?.image?.[0]?.alttext || "product image"}
                className="w-full h-auto rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                New
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              {singleProduct?.name}
            </h1>
            <p className="text-2xl text-green-600 font-semibold">
              ₹{singleProduct?.price}
            </p>
            <p className="text-gray-700 text-md leading-relaxed">
              {singleProduct?.description}
            </p>

            <div className="flex items-center space-x-3">
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm">
                Category: {singleProduct?.category}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={decreaseQty}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={increaseQty}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
              >
                +
              </button>
            </div>

            {/* Color Options */}
            <div className="space-y-2">
              <h3 className="text-md font-medium text-gray-800">
                Available Colors:
              </h3>
              <div className="flex gap-2">
                {singleProduct?.color?.map((clr, idx) => (
                  <span
                    key={idx}
                    className={`w-6 h-6 rounded-full border-2 border-gray-300`}
                    style={{ backgroundColor: clr }}
                    title={clr}
                  ></span>
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="space-y-2">
              <h3 className="text-md font-medium text-gray-800">
                Available Sizes:
              </h3>
              <div className="flex gap-2">
                {singleProduct?.size?.map((sz, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-200 text-sm rounded-md font-semibold"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                dispatch(addToCart({ productId: singleProduct._id, quantity }))
              }
              className="mt-4 w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Product Features
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-inside text-gray-700">
            <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
              ✔️ High-quality material
            </li>
            <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
              ✔️ Stylish design
            </li>
            <li className="bg-gray-50 p-4 rounded-lg shadow-sm">
              ✔️ Comfortable fit
            </li>
          </ul>
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Related Products
          </h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Explore more products that match your style and preferences.
          </p>
          <ResultProducts array={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
