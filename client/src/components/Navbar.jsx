import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slice/authSlice";
import { IoMdClose } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { clearCartState } from "../redux/slice/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartcount } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/category/men", label: "Men" },
    { path: "/category/women", label: "Women" },
    { path: "/category/kids", label: "Kids" },
    { path: "/collection", label: "Filter" },
    { path: "/cart", label: "Cart" },
    { path: "/user/profile", label: "Profile" },
    { path: "/user/orders", label: "Orders" },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0  right-0 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-gray-800">
          Fashion<span className="text-pink-500 animate-pulse">Wear</span>
        </Link>

        {/* Desktop Nav */}
        {user && (
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-gray-700 hover:text-pink-500 font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side (Cart & Profile) */}
        {user && (
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-pink-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {cartcount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1">
                  {cartcount}
                </span>
              )}
            </Link>

            <div className="relative group">
              <span className="cursor-pointer hover:text-pink-800">
                <CgProfile size={25} />
              </span>
              <div className="absolute right-0 -mt-2 w-40 bg-white border rounded-md shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Admin
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/user/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                  </li>
                  <li
                    onClick={() => {dispatch(logoutUser())
                      dispatch(clearCartState())
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-gray-900"
          >
            {menuOpen ? <IoMdClose size={25} /> : <FiMenu size={25} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`md:hidden fixed  top-16 left-0 w-full bg-white shadow-md transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex  flex-col px-4 py-6 space-y-3">
          {user &&
            navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-gray-800 font-medium hover:text-pink-500 transition"
              >
                {link.label}
              </Link>
            ))}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 font-medium hover:text-pink-500"
            >
              Admin
            </Link>
          )}
          {user && (
            <button
              onClick={() => {
                dispatch(logoutUser());
                setMenuOpen(false);
              }}
              className="text-left text-gray-800 hover:text-red-500 font-medium"
            >
              Logout
            </button>
          )}
          {!user && (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 hover:text-pink-500"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
