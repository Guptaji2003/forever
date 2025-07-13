import React from "react";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCart } from "../redux/slice/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <div
        key={product.productId}
        className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
      >
        {/* Product Info */}
        <div className="flex items-start md:items-center">
          <img
            onClick={() => navigate(`/product/${product?.productId}`)}
            src={product?.image?.[0]?.url}
            alt="Product"
            className="w-24 h-24 object-cover rounded-md border"
          />
          <div className="ml-4 space-y-1">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
            <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
            <div className="flex items-center space-x-3">
              {product.color && (
                <span className="flex items-center text-sm">
                  Color:
                  <span
                    className="ml-1 w-4 h-4 rounded-full border"
                    style={{ backgroundColor: product.color }}
                  ></span>
                </span>
              )}
              {product.size && (
                <span className="text-sm text-gray-500">
                  Size: {product.size}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2">
          <div className="flex items-center bg-gray-200 rounded-md overflow-hidden">
            <button
              className="px-3 py-1 text-lg font-bold bg-gray-300 hover:bg-gray-400"
              onClick={() => {
                if (product.quantity === 1) {
                  const confirmDelete = window.confirm(
                    "Remove this product from cart?"
                  );
                  if (!confirmDelete) return;
                }

                dispatch(
                  updateCart({
                    productId: product.productId,
                    action: "decrement",
                  })
                );
              }}
            >
              −
            </button>
            <span className="px-4 py-1 bg-white">{product.quantity}</span>
            <button
              className="px-3 py-1 text-lg font-bold bg-gray-300 hover:bg-gray-400"
              onClick={() =>
                dispatch(
                  updateCart({
                    productId: product.productId,
                    action: "increment",
                  })
                )
              }
            >
              +
            </button>
          </div>
          <button
            className="text-red-500 text-sm hover:underline"
            onClick={() => {
              if (product.quantity === 1) {
                const confirmDelete = window.confirm(
                  "Remove this product from cart?"
                );
                if (!confirmDelete) return;
              }
              dispatch(removeCartItem(product.productId));
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
