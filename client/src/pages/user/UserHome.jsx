import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { user } = useSelector((store) => store.auth);

  // const user = {
  //   name: "John Doe",
  //   email: "john@example.com",
  //   phone: "+1 234 567 890",
  //   address: "123 Street, City, Country",
  //   profilePic: "https://via.placeholder.com/150",
  //   joined: "January 10, 2022",
  // };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1  p-6 w-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            User Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F1F5F9] text-gray-800 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold">Orders</p>
              {/* <p className="text-3xl font-bold">{user.orders.length}</p> */}
            </div>
            <div className="p-6 bg-[#F1F5F9] text-gray-800 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold">Wishlist</p>
              {/* <p className="text-3xl font-bold">{user.whislist.length}</p> */}
            </div>
            <div className="p-6 bg-[#F1F5F9] text-gray-800 rounded-lg shadow-md text-center">
              <p className="text-lg font-semibold">Total Spent</p>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>
        </div>

        <div className="h-screen w-300 flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full flex flex-col items-center">
            <div className="relative w-32 h-32">
              <img
                src={""}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-blue-500"
              />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>
            {/* <p className="text-gray-500">{user.phone}</p>
            <p className="text-gray-500">{user.address}</p>
            <p className="text-gray-500 text-sm">Joined: {user.joined}</p> */}

            <div className="mt-6 w-full flex flex-col space-y-4">
             <Link to={'/user/edit'}>
             <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Edit Profile
              </button>
             </Link>
              {/* <button className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition">Order History</button> */}
              {/* <button className="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition">Logout</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
