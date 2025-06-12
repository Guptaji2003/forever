import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const UserDashBoard = () => {
    const { user } = useSelector((store) => store.auth);
  
  // const user = {
  //   name: "John Doe",
  //   email: "john@example.com",
  //   orders: 5,
  //   wishlist: 3,
  //   totalSpent: "$500",
  //   profilePic: "https://via.placeholder.com/100",
  // };

  return (
   <div className="min-h-screen bg-gray-100 flex">
  {/* Sidebar */}
  <aside className="w-72 bg-slate-900 text-white flex flex-col justify-between py-6 px-4 shadow-lg">
    <div>
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-8 border-b border-slate-700 pb-4">
        {/* <img src={user.profilePic} alt="Profile" className="w-14 h-14 rounded-full border-2 border-white" /> */}
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-slate-400">{user.email}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-3">
        <Link to="/user/profile">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
            🏠 Dashboard
          </button>
        </Link>
        <Link to="/user/orders">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
            📦 My Orders
          </button>
        </Link>
        <Link to="/user/wishlist">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
            ❤️ Wishlist
          </button>
        </Link>
      </nav>
    </div>

    {/* Logout (Optional) */}
    {/* <div className="mt-10">
      <button className="w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
        🚪 Logout
      </button>
    </div> */}
  </aside>

  {/* Main Content Area */}
  <main className="flex-1 p-6 overflow-y-auto">
    <Outlet />
  </main>
</div>

  );
};

export default UserDashBoard;
