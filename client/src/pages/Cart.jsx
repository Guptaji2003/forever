import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import {
  clearCartState,
  removeCartItem,
  updateCart,
} from "../redux/slice/cartSlice";
import { createCheckout } from "../redux/slice/checkoutSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const shippingCharge = 10;

  return (
    <div className="min-h-screen mt-15 bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          {cart?.products?.length > 0 && (
            <button
              onClick={() => dispatch(clearCartState())}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {cart?.products?.length > 0 ? (
              cart?.products?.map((product) => (
                <div
                  key={product.productId}
                  className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  {/* Product Info */}
                  <div className="flex items-start md:items-center">
                    <img
                      src={product?.image?.[0]?.url}
                      alt="Product"
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <div className="ml-4 space-y-1">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-500">Category: {product.category}</p>
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
                          <span className="text-sm text-gray-500">Size: {product.size}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2">
                    <div className="flex items-center bg-gray-200 rounded-md overflow-hidden">
                      <button
                        className="px-3 py-1 text-lg font-bold bg-gray-300 hover:bg-gray-400"
                        onClick={() =>
                          dispatch(updateCart({ productId: product.productId, action: "decrement" }))
                        }
                      >
                        −
                      </button>
                      <span className="px-4 py-1 bg-white">{product.quantity}</span>
                      <button
                        className="px-3 py-1 text-lg font-bold bg-gray-300 hover:bg-gray-400"
                        onClick={() =>
                          dispatch(updateCart({ productId: product.productId, action: "increment" }))
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-red-500 text-sm hover:underline"
                      onClick={() => dispatch(removeCartItem(product.productId))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full py-20 text-gray-600">
                <ShoppingCart className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                <p className="text-lg font-semibold">Your cart is empty</p>
                <Link
                  to="/"
                  className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart?.products?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Subtotal</span>
                <span>₹{cart?.totalcartamount}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Shipping</span>
                <span>₹{shippingCharge}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
                <span>Total</span>
                <span>₹{cart?.totalcartamount + shippingCharge}</span>
              </div>
              <Link to="/checkout">
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
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
