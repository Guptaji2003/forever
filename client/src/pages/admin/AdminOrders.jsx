import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import GetAllOrders from "../../hooks/GetAllOrders";
import { useSelector } from "react-redux";
const AdminOrders = () => {
  // const orders = [
  //     {
  //       id: "001",
  //       customer: "John Doe",
  //       items: [
  //         { name: "T-Shirt", size: "M", color: "Red", quantity: 2, price: "$30" },
  //         { name: "Jeans", size: "L", color: "Blue", quantity: 1, price: "$90" }
  //       ],
  //       totalAmount: "$120",
  //       status: "Pending"
  //     },
  //     {
  //       id: "002",
  //       customer: "Jane Smith",
  //       items: [
  //         { name: "Jacket", size: "XL", color: "Black", quantity: 1, price: "$250" }
  //       ],
  //       totalAmount: "$250",
  //       status: "Shipped"
  //     },
  //     {
  //       id: "003",
  //       customer: "Mike Johnson",
  //       items: [
  //         { name: "Shirt", size: "L", color: "White", quantity: 3, price: "$25" }
  //       ],
  //       totalAmount: "$75",
  //       status: "Delivered"
  //     }
  //   ];
 GetAllOrders();
   const { orders } = useSelector((store) => store.order);
 console.log('====================================');
 console.log(orders);
 console.log('====================================');
  return (
   <>
   <div>
   <div className="h-screen bg-gray-100 p-6 flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Orders</h2>
      <div className="grid w-300 grid-cols-1 gap-6 overflow-auto">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-[1.02]"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="text-lg font-semibold">
                  Order ID: <span className="text-gray-700">{order._id}</span>
                </p>
                <p className="text-lg font-semibold">
                  Customer:{" "}
                  <span className="text-gray-700">{order.userId._id}</span>
                </p>
                <p className="text-lg font-semibold">
                  Total:{" "}
                  <span className="text-green-600">{order.userId.email}</span>
                </p>
                {/* <p className="text-lg font-semibold">
                  Status:
                  <span
                    className={`ml-2 px-3 py-1 rounded text-white ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p> */}
              </div>
              <div className="space-x-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Cancel
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">Ordered Items</h3>
              <table className="w-full border rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gray-300 text-gray-700">
                    <th className="p-3">Item</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Color</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, i) => (
                    <tr
                      key={i}
                      className="text-center border-t bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="p-3">{item.name}</td>
                      <td className="p-3"></td>
                      <td className="p-3">
                        <span
                          className="px-3 py-1 rounded-lg text-white"
                          // style={{ backgroundColor: item.color.toLowerCase() }}
                        >
                          {/* {item.color} */}
                        </span>
                      </td>
                      <td className="p-3"></td>
                      <td className="p-3">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
   </>
  );
};

export default AdminOrders;
