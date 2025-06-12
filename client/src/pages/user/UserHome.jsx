import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { user } = useSelector((store) => store.auth);
  const { totalspent,userOrders } = useSelector((store) => store.order);

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
     <div className="min-h-screen bg-gray-50 p-6 flex flex-col space-y-10">
  {/* Top Metrics Section */}
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-gray-800 mb-8">👤 User Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Orders */}
      <div className="p-6 bg-white rounded-xl shadow-md text-center hover:shadow-lg transition">
        <p className="text-lg font-medium text-gray-500 mb-2">Orders</p>
        {/* <p className="text-3xl font-bold text-blue-600">{user.orders.length}</p> */}
        <p className="text-3xl font-bold text-blue-600">{userOrders.length}</p>
      </div>

      {/* Wishlist */}
      <div className="p-6 bg-white rounded-xl shadow-md text-center hover:shadow-lg transition">
        <p className="text-lg font-medium text-gray-500 mb-2">Wishlist</p>
        {/* <p className="text-3xl font-bold text-pink-500">{user.wishlist.length}</p> */}
        <p className="text-3xl font-bold text-pink-500">--</p>
      </div>

      {/* Total Spent */}
      <div className="p-6 bg-white rounded-xl shadow-md text-center hover:shadow-lg transition">
        <p className="text-lg font-medium text-gray-500 mb-2">Total Spent</p>
        <p className="text-3xl font-bold text-green-600">₹{totalspent}</p>
      </div>
    </div>
  </div>

  {/* Profile Section */}
  <div className="flex justify-center">
    <div className="bg-white rounded-2xl shadow-lg p-10 max-w-2xl w-full text-center">
      <div className="flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-sm">
          <img
            src={""}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <h3 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h3>
        <p className="text-gray-500">{user.email}</p>
        {/* <p className="text-gray-500">{user.phone}</p>
        <p className="text-gray-500">{user.address}</p>
        <p className="text-gray-500 text-sm">Joined: {user.joined}</p> */}

        {/* Actions */}
        <div className="mt-6 w-full">
          <Link to="/user/edit">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              ✏️ Edit Profile
            </button>
          </Link>

          {/* Optional Buttons */}
          {/* <button className="mt-3 w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition">
            📜 Order History
          </button> */}
          {/* <button className="mt-3 w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition">
            🚪 Logout
          </button> */}
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default UserHome;
