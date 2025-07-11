import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchRelatedProducts,
  fetchSingleProduct,
} from "../redux/slice/productSlice";
import { Star } from "lucide-react";

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
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-fuchsia-500 transition duration-300">
        {/* Image */}
        <img
          src={product?.image?.[0]?.url}
          alt={product?.image?.[0]?.altText || product.name}
          className="w-full h-64 object-cover"
        />

        {/* Info */}
        <div className="p-4 space-y-2">
          <p className="border w-min rounded px-2 bg-gray-700 text-white">{product.category}</p>
          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-pink-600 font-bold text-lg">₹{product?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Item;
