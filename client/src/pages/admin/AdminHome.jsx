import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { alluser } = useSelector((store) => store.auth);
  const { allOrders,totalRevenue } = useSelector((state) => state.order);

  return (
    <div className="flex-1 p-5">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">{allOrders.length}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-2xl">{alluser?.length}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl">{totalRevenue}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6">Outlets</h2>
      <div className="grid grid-cols-2 gap-4 mt-3">
        {["New York", "Los Angeles", "Chicago", "Houston"].map(
          (outlet, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
            >
              <span>{outlet}</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                Manage
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminHome;
