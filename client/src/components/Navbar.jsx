import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { logoutUser } from "../redux/slice/authSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartcount } = useSelector((state) => state.cart);

  return (
    <div>
      <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            {/* <!-- Logo --> */}
            <div class="flex-shrink-0 flex items-center">
              <a
                href="#"
                class="text-2xl font-bold text-gray-800 hover:text-gray-600"
              >
                FashionWear
              </a>
            </div>

            {/* <!-- Navbar Links --> */}
            {user && (
              <div class="hidden md:flex space-x-8 items-center">
                <a
                  href="/"
                  class="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Home
                </a>
                <a
                  href="/category/men"
                  class="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Men
                </a>
                <a
                  href="/category/women"
                  class="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Women
                </a>
                <a
                  href="/category/kids"
                  class="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Kids
                </a>
                <a
                  href="/collection"
                  class="text-gray-700 hover:text-red-500 font-medium"
                >
                  Collection
                </a>
              </div>
            )}
            {/* <!-- Cart & User Section --> */}
            {user && (
              <div class="flex  items-center space-x-6">
                <a
                  href="/cart"
                  class="text-gray-700 hover:text-gray-900 flex relative  items-center"
                >
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-2a2 2 0 100 4 2 2 0 000-4z"
                    ></path>
                  </svg>
                  <span className="absolute -top-3 -right-2 text-white text-xs bg-red-600 rounded-4xl px-1">
                    {cartcount}
                  </span>
                </a>
                <div className="relative group">
                  <span>
                    <CgProfile size={25} />
                  </span>

                  <div className="absolute z-99 -right-15 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ul className="py-2">
                      <Link to={"/user/profile"}>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Profile
                        </li>
                      </Link>
                      {user?.role === "admin" && (
                        <Link to={"/admin/dashboard"}>
                          {" "}
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Admin
                          </li>
                        </Link>
                      )}

                      <Link to={"/user/orders"}>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          Orders
                        </li>
                      </Link>
                      <li
                        onClick={() => dispatch(logoutUser())}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {/* <!-- Mobile Menu Button --> */}
            <div class="md:hidden flex items-center">
              <button
                id="menu-toggle"
                class="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile Menu --> */}
        <div id="mobile-menu" class="hidden md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              class="block text-gray-700 hover:text-gray-900 font-medium"
            >
              Home
            </a>
            <a
              href="#men"
              class="block text-gray-700 hover:text-gray-900 font-medium"
            >
              Men
            </a>
            <a
              href="#women"
              class="block text-gray-700 hover:text-gray-900 font-medium"
            >
              Women
            </a>
            <a
              href="#kids"
              class="block text-gray-700 hover:text-gray-900 font-medium"
            >
              Kids
            </a>
            <a
              href="#sale"
              class="block text-gray-700 hover:text-red-500 font-medium"
            >
              Sale
            </a>
            <a
              href="#cart"
              class="block text-gray-700 hover:text-gray-900 font-medium"
            >
              Cart
            </a>
            <a
              href="#login"
              class="block text-gray-700 hover:text-gray-900 font-medium"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
