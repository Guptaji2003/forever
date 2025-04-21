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
    <div className="h-180 bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E293B] text-white p-6 flex flex-col space-y-6">
        <div className="flex items-center space-x-4">
          {/* <img
            src={user.profilePic}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          /> */}
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to={'/user/profile'}>
            <button className="text-left w-full px-4 py-2 bg-[#334155] rounded-lg hover:bg-[#475569]">
              Dashboard
            </button>
          </Link>
          <Link to={'/user/orders'}>
            <button className="text-left w-full px-4 py-2 bg-[#334155] rounded-lg hover:bg-[#475569]">
              My Orders
            </button>
          </Link>
          <Link to={'/user/wishlist'}>
            <button className="text-left w-full px-4 py-2 bg-[#334155] rounded-lg hover:bg-[#475569]">
              Wishlist
            </button>
          </Link>
          {/* <Link>
            <button className="text-left w-full px-4 py-2 bg-[#DC2626] rounded-lg hover:bg-[#B91C1C]">
              Logout
            </button>
          </Link> */}
        </nav>
      </div>

      {/* Main Content */}
      <Outlet/>
    </div>
  );
};

export default UserDashBoard;
