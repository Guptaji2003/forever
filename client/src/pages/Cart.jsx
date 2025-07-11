import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import {
  clearCartState,
  fetchUserCart,
  removeCartItem,
  updateCart,
} from "../redux/slice/cartSlice";
import { createCheckout } from "../redux/slice/checkoutSlice";
import CartItem from "../components/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const shippingCharge = 10;

   useEffect(() => {
      dispatch(fetchUserCart());
    }, [dispatch]);

  return (
    <div data-aos="fade-up" className="min-h-screen mt-15 bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {cart?.products?.length > 0 && (
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          )}
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {cart?.products?.length > 0 &&
              cart?.products?.map((product) => (
               <CartItem product={product}/>
              ))}
          </div>

          {/* Order Summary */}
          {cart?.products?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Order Summary
              </h2>
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
                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          )}

          {!cart?.products?.length > 0 && (
            <div className="text-center col-span-full py-40  text-gray-600">
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
      </div>
    </div>
  );
};

export default Cart;
