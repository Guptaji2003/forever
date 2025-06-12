import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { removeCartItem, updateCart } from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
const Cart = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const shippingCharge = 10;
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="w-full max-h-[500px] overflow-y-scroll lg:col-span-2">
            {cart?.products?.map((product) => (
              <div
                key={product.productId}
                className="border rounded-lg p-4 mb-4 flex items-center justify-between shadow-md"
              >
                <div className="flex items-center">
                  <img
                    src={product?.image?.[0]?.url}
                    alt={product.image[0]?.alttext || "Product Image"}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Category: {product.category}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Price: ₹{product.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      className="px-3 py-1 text-gray-700 hover:text-white hover:bg-gray-600 rounded-l-lg"
                      onClick={() =>
                        dispatch(
                          updateCart({
                            productId: product?.productId,
                            action: "decrement",
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{product.quantity}</span>
                    <button
                      className="px-3 py-1 text-gray-700 hover:text-white hover:bg-gray-600 rounded-r-lg"
                      onClick={() =>
                        dispatch(
                          updateCart({
                            productId: product?.productId,
                            action: "increment",
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="text-red-600 hover:text-red-800 font-medium"
                    onClick={() => dispatch(removeCartItem(product?.productId))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {(cart?.totalcartamount > 0 && (
            <div className="w-full rounded-lg p-6 bg-gray-50 shadow-md">
              <h2 className="text-2xl font-medium text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Subtotal</p>
                <p>₹{cart?.totalcartamount}</p>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Shipping</p>
                <p>₹{shippingCharge}</p>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold mb-4">
                <p>Total</p>
                <p>₹{cart?.totalcartamount + shippingCharge}</p>
              </div>
              <button
                // onClick={placeOrder}
                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          )) || (
            <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
              <ShoppingCart className="w-20 h-20 text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven’t added anything to your cart yet.
              </p>
              <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
