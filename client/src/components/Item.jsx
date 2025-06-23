import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchRelatedProducts,
  fetchSingleProduct,
} from "../redux/slice/productSlice";

const Item = ({ product }) => {
  const dispatch = useDispatch();
  const currency = "₹"; // or "$", etc.

  return (
    <Link
      onClick={() => {
        if (product?._id) {
          dispatch(fetchSingleProduct(product?._id));
        }
      }}
      to={`/product/${product._id}`}
      className="block"
    >
      <div className="border p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white h-full">
        <img
          src={product?.image?.[0]?.url}
          alt={product?.name || "Product"}
          className="rounded-lg w-full h-48 object-cover sm:h-52 md:h-64"
        />
        <h3 className="mt-3 text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          {currency}
          {product.price}
        </p>
      </div>
    </Link>
  );
};

export default Item;
