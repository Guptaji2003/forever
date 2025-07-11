import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logoutUser } from "../../redux/slice/authSlice";
import { FiMenu, FiX } from "react-icons/fi";
import { clearCartState } from "../../redux/slice/cartSlice";

const UserDashBoard = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div data-aos="fade-up" className="flex bg-gray-100 min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between mt-15 h-full p-6">
          <div>
            {/* User Info */}
            <div className="mb-6 flex flex-col justify-center items-center border-b border-slate-700 pb-4">
              <img src="" alt="" className="h-13 w-13 rounded-full bg-white"/>
              <h2 className="text-lg font-bold">{user.name}</h2>
              {/* <p className="text-sm text-slate-400">{user.email}</p> */}
            </div>

            {/* Navigation */}
            <nav className="space-y-3 flex flex-col">
              <Link to="/user/profile">
                <button className="w-full text-left px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700">
                  🏠 Dashboard
                </button>
              </Link>
              <Link to="/user/orders">
                <button className="w-full text-left px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700">
                  📦 My Orders
                </button>
              </Link>
              <Link to="/user/wishlist">
                <button className="w-full text-left px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700">
                  ❤️ Wishlist
                </button>
              </Link>
            </nav>
          </div>

          {/* Logout */}
          <div className="pt-6 border-t  border-slate-700 mb-20 mt-6">
            <button
              onClick={() => {
                dispatch(logoutUser());
                dispatch(clearCartState())
                setSidebarOpen(false);
              }}
              className="w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button (Fixed Under Navbar) */}
      <div className="lg:hidden fixed top-16 left-0 z-50 bg-white shadow-md w-full px-4 py-2">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="flex items-center space-x-2 text-gray-800"
        >
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          <span className="font-medium">Menu</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 mt-24 lg:mt-16 px-4 py-6  overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashBoard;
