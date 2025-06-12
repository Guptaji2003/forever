import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchRelatedProducts,
  fetchSingleProduct,
} from "../redux/slice/productSlice";

const Item = ({ product }) => {
  const dispatch = useDispatch();

  const currency = "";
  return (
    <Link
      onClick={() => {
        if (product?._id) {
          dispatch(fetchSingleProduct(product?._id));
        }
      }}
      to={`/product/${product._id}`}
    >
      <div className="border p-4 rounded-lg shadow-sm">
        <img
          src={product?.image?.[0]?.url}
          alt="Carabiner Set"
          className="rounded-lg w-full"
        />
        <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-gray-600">
          {currency}
          {product.price}
        </p>
      </div>
    </Link>
  );
};

export default Item;
