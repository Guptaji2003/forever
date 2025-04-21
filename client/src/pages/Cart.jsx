import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import axios from 'axios';
import UseAddToCart from "../hooks/UseAddToCart";
import { toast } from "react-toastify";
// import { products } from "../assets/Product";

const Cart = () => {
  const  ship = 50;
  const { user } = useSelector((store) => store.auth);
 const {addtocart}=UseAddToCart();
 const cartamount = user?.cart?.reduce((total, item) => total + parseInt(item.price), 0);
 const dispatch=useDispatch();

 const placeorder = async () => {
  // e.preventDefault();

  try {
    // setloading(true);
    const res = await axios.post("http://localhost:8000/create-order", cartamount, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch(setAuthUser(res.data.user));
      toast.success(res.data.message);
      // navigate("/");
    } else {
      toast.error(res.data.error);
    }
    console.log(res.data);
  } catch (error) {
    console.error("Error:", error);
  } 
};


  return (
    <div>
      <div class="max-w-screen-xl h- mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <div class=" grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="w-200 h-150 overflow-y-scroll  lg:col-span-2">
            {user?.cart?.map((product) => (
              // <Item key={product.id} product={product} />
              <div class="border rounded-lg p-4 mb-4 flex items-center justify-between shadow-md">
                <div class="flex items-center">
                  <img
                    src={product.image}
                    alt="Product Image"
                    class="w-20 h-20 rounded-lg object-cover"
                  />
                  <div class="ml-4">
                    <h2 class="text-lg font-medium text-gray-800">
                      {product.name}
                    </h2>
                    <p class="text-gray-600 text-sm">
                      Category: {product.category}
                    </p>
                    <p class="text-gray-600 text-sm">
                      Price: 
                      {product.price}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center border rounded-lg">
                    <button
                      class="px-3 py-1 text-gray-700 hover:text-white hover:bg-gray-600 rounded-l-lg"
                      onclick="decreaseQuantity()"
                    >
                      -
                    </button>
                    <span className="w-12 text-center border-none focus:outline-none">
                      1
                    </span>

                    <button
                      class="px-3 py-1 text-gray-700 hover:text-white hover:bg-gray-600 rounded-r-lg"
                      onclick="increaseQuantity()"
                    >
                      +
                    </button>
                  </div>

                  <button
                    class="text-red-600 hover:text-red-800 font-medium"
                    onClick={()=>addtocart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div class=" w-100 rounded-lg p-6 bg-gray-50 shadow-md">
            <h2 class="text-2xl font-medium text-gray-800 mb-4">
              Order Summary
            </h2>
            <div class="flex justify-between text-gray-700 mb-2">
              <p>Subtotal</p>
              <p>{cartamount}</p>
            </div>
            <div class="flex justify-between text-gray-700 mb-2">
              <p>Shipping</p>
              <p>{ship}</p>
            </div>
            <div class="flex justify-between text-gray-800 font-semibold mb-4">
              <p>Total</p>
              <p>{cartamount+ship}</p>
            </div>
            <button onClick={()=>placeorder()} class="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
