import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../redux/slice/orderSlice";

const UserOrders = () => {
  const { userOrders, loading } = useSelector((store) => store.order);
  const dispatch = useDispatch();
 
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">🧾 My Orders</h2>
{loading?"Loading":
      (<div className="space-y-10 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-2">
        {userOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            {/* Header: Order Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
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
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
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

            {/* Product Table */}
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
                  {order.products.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <img
                          src={item.image[0]?.url}
                          alt={item.image[0]?.alttext || "product"}
                          className="w-16 h-16 rounded-md object-cover border"
                        />
                      </td>
                      <td className="px-4 py-3 text-gray-800 font-medium">
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

            {/* Order Footer: Address + Total */}
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
      </div>)}
    </div>
  );
};

export default UserOrders;
