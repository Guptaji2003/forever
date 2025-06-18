import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  clearCartState,
  removeCartItem,
  updateCart,
} from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { createCheckout } from "../redux/slice/checkoutSlice";
const Cart = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const shippingCharge = 10;
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold w-200 text-gray-800 mb-6 flex justify-between">
          Shopping Cart{" "}
          <span
            onClick={() => dispatch(clearCartState())}
            className="border font-light p-1 text-xl bg-green-500 rounded "
          >
            clear cart
          </span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="w-full max-h-[500px] overflow-y-scroll lg:col-span-2">
            {cart?.products?.map((product) => (
              <div
                key={product.productId}
                className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg transition hover:shadow-xl duration-300"
              >
                {/* Product Image and Details */}
                <div className="flex items-start md:items-center">
                  <img
                    src={product?.image?.[0]?.url}
                    alt={product.image?.[0]?.alttext || "Product Image"}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover ring-1 ring-gray-200 shadow-sm"
                  />
                  <div className="ml-5 space-y-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Category: {product.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ₹{product.price}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      {product?.color && (
                        <span className="flex items-center text-sm">
                          Color:
                          <span
                            className="ml-1 w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: product.color }}
                          ></span>
                        </span>
                      )}
                      {product?.size && (
                        <span className="text-sm text-gray-500">
                          Size: {product.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Remove Button */}
                <div className="mt-4 md:mt-0 flex flex-col items-end space-y-3">
                  <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                      onClick={() =>
                        dispatch(
                          updateCart({
                            productId: product?.productId,
                            action: "decrement",
                          })
                        )
                      }
                    >
                      −
                    </button>
                    <span className="px-5 text-center font-medium text-gray-700 bg-white">
                      {product.quantity}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
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
                    className="text-sm font-medium text-red-500 hover:text-red-700 underline"
                    onClick={() => dispatch(removeCartItem(product?.productId))}
                  >
                    Remove Item
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
              <Link to={"/checkout"}>
                <button
                  onClick={() =>
                    dispatch(
                      createCheckout({
                        products: cart.products,
                        shippingaddress: cart.shippingaddress,
                        totalamount: cart.totalamount,
                        paymentmethod: cart.paymentmethod,
                      })
                    )
                  }
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  Checkout
                </button>
              </Link>
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
