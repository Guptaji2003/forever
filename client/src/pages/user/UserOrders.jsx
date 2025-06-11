import React from "react";
import { useSelector } from "react-redux";

const UserOrders = () => {
  // const { user } = useSelector((store) => store.auth);

  const orders = [
      {
        id: "ORD12345",
        date: "March 30, 2025",
        status: "Shipped",
        total: "$150",
        items: [
          { name: "Blue Denim Jacket", image: "https://via.placeholder.com/100", price: "$50" },
          { name: "White Sneakers", image: "https://via.placeholder.com/100", price: "$100" },
          { name: "Black Hoodie", image: "https://via.placeholder.com/100", price: "$70" },
          { name: "Red Cap", image: "https://via.placeholder.com/100", price: "$20" }
        ]
      },
      {
        id: "ORD67890",
        date: "March 25, 2025",
        status: "Delivered",
        total: "$80",
        items: [
          { name: "Black T-Shirt", image: "https://via.placeholder.com/100", price: "$30" },
          { name: "Gray Joggers", image: "https://via.placeholder.com/100", price: "$50" }
        ]
      }
    ];

  return (
    <div className=" w-300 overflow-y-scroll h-150 bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Order ID:{" "}
                  {parseInt(Math.random() *
                    1000 *
                    (order._id.slice(0, 1) + Math.random() * 100))}
                </h3>
                <p className="text-gray-500 text-sm">
                  Date: {new Date().toLocaleString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-white ${
                  order.status === "Shipped" ? "bg-blue-500" : "bg-green-500"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-left p-3 text-gray-700">Item</th>
                    <th className="text-left p-3 text-gray-700">Image</th>
                    <th className="text-left p-3 text-gray-700">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3 text-gray-700">{item.name}</td>
                      <td className="p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg border"
                        />
                      </td>
                      <td className="p-3 text-gray-700">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right font-semibold text-lg">
              Total: 1500
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
