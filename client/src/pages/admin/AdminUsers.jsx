import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminUpdateUser, AllUser } from "../../redux/slice/authSlice";

const AdminUsers = () => {
  const { alluser, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <div className="h-screen bg-gray-100 p-6 flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Users</h2>
      <div className="bg-white w-300 shadow-lg rounded-xl p-6 overflow-auto">
        {loading ? (
          "Loading..."
        ) : (
          <table className="w-full border rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-300 text-gray-700">
                <th className="p-3">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Total Spent</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alluser && alluser.length > 0 ? (
                alluser.map((user, i) => (
                  <tr
                    key={i}
                    className="text-center border-t bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="p-3">{user._id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">4</td>
                    <td className="p-3">15000</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 space-x-3">
                      <button
                        onClick={() => dispatch(AdminUpdateUser(user._id))}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Change Role
                      </button>
                      {/* <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Remove
                      </button> */}
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
