import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile } from "../../redux/slice/authSlice";
import { toast } from 'react-hot-toast';
import EditProfileModal from "../../components/EditProfileModal";
const UserHome = () => {
  const { user } = useSelector((store) => store.auth);
  const { totalspent, userOrders } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const newName = prompt("Enter your new name:");
    if (newName?.trim()) {
      dispatch(UpdateProfile(newName.trim()));
    }
  };

  return (
    <div data-aos="fade-up" className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
        👤 Welcome, {user?.name?.split(" ")[0] || "User"}!
      </h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Orders */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-1">Orders</p>
          <p className="text-3xl font-bold text-blue-600">{userOrders.length}</p>
        </div>

        {/* Wishlist */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-1">Wishlist</p>
          <p className="text-3xl font-bold text-pink-500">--</p>
        </div>

        {/* Total Spent */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-green-600">₹{totalspent || 0}</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-sm mb-4">
          <img
            src="https://i.pravatar.cc/300"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{user.email}</p>

        {/* Update Profile Button */}
        <button
          onClick={handleUpdate}
          className="mt-2 px-6 py-3 w-full bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          ✏️ Edit Profile
          {/* <EditProfileModal/> */}
        </button>
      </div>
    </div>
  );
};

export default UserHome;
