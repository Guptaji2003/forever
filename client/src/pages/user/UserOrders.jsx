import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserOrders = () => {
  const { userOrders, loading } = useSelector((store) => store.order);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🧾 My Orders</h2>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : userOrders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-8 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {userOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow p-5"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Payment: {order.isPaid ? "✅ Paid" : "❌ Not Paid"} |{" "}
                    {order.paymentmethod}
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex flex-col sm:flex-row gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full uppercase w-fit
                      ${
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
                      Delivered: {new Date(order.deliveredAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Order Table */}
              <div className="overflow-x-auto border rounded-lg">
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
                    {order.products.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3">
                          <img
                            src={item.image?.[0]?.url}
                            alt={item.image?.[0]?.alttext || "Product"}
                            className="w-14 h-14 rounded object-cover border"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 capitalize">{item.color || "—"}</td>
                        <td className="px-4 py-3 uppercase">{item.size || "—"}</td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3">₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Footer */}
              <div className="mt-4 flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div className="text-sm text-gray-600">
                  <p className="font-semibold text-gray-800 mb-1">
                    📍 Shipping Address:
                  </p>
                  <p>
                    {order.shippingaddress.address}, {order.shippingaddress.city},{" "}
                    {order.shippingaddress.state} - {order.shippingaddress.postalcode}
                  </p>
                </div>
                <div className="text-lg font-bold text-gray-800">
                  Total: ₹{order.totalamount}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
