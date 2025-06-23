import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../redux/slice/orderSlice";

const AdminOrders = () => {
  const { allOrders } = useSelector((store) => store.order);
  const dispatch = useDispatch();

  // Per-order status handlers
  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 ">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">📦 User Orders</h2>

      <div className="space-y-10 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-2">
        {allOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Order ID: #{order._id.slice(-6)}
                </h3>
                <p className="text-sm text-gray-500">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Payment: {order.isPaid ? "✅ Paid" : "❌ Not Paid"} | Method:{" "}
                  {order.paymentmethod}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  👤 User: {order.userId?.name || "N/A"} | 📧{" "}
                  {order.userId?.email || "N/A"}
                </p>
              </div>

              {/* Order Status Selector */}
              <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
                <select
                  className="w-48 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="delivered">Delivered</option>
                </select>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold uppercase ${
                    order.status === "delivered"
                      ? "bg-green-600 text-white"
                      : order.status === "shipped"
                      ? "bg-blue-500 text-white"
                      : order.status === "processing"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {order.status}
                </span>

                {order.isDelivered && (
                  <span className="text-xs text-gray-500">
                    Delivered on:{" "}
                    {new Date(order.deliveredAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Color</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <img
                          src={item.image[0]?.url}
                          alt={item.image[0]?.alttext || "product"}
                          className="w-16 h-16 rounded-md object-cover border"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {item.color || "N/A"}
                      </td>
                      <td className="px-4 py-3 uppercase">
                        {item.size || "N/A"}
                      </td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">₹{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer: Address + Total */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-700 mb-1">
                  📍 Shipping Address:
                </p>
                <p>
                  {order.shippingaddress.address}, {order.shippingaddress.city},{" "}
                  {order.shippingaddress.state} -{" "}
                  {order.shippingaddress.postalcode}
                </p>
              </div>
              <div className="text-lg font-bold text-gray-800">
                Total: ₹{order.totalamount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
