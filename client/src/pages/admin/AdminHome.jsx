import React from "react";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { alluser } = useSelector((store) => store.auth);
  const { allOrders, totalRevenue } = useSelector((state) => state.order);

  return (
    <div data-aos="fade-up" className="flex-1 px-4 md:px-8 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📊 Dashboard Overview
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-lg font-medium mb-2">
            Total Orders
          </h2>
          <p className="text-4xl font-bold text-blue-700">{allOrders.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-lg font-medium mb-2">
            Active Users
          </h2>
          <p className="text-4xl font-bold text-green-600">{alluser?.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500 text-lg font-medium mb-2">
            Total Revenue
          </h2>
          <p className="text-4xl font-bold text-purple-600">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Outlets Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏪 Outlets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["New York", "Los Angeles", "Chicago", "Houston"].map((outlet, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-xl p-5 flex justify-between items-center"
          >
            <span className="text-lg font-medium text-gray-700">{outlet}</span>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
