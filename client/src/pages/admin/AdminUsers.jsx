import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminUpdateUser } from "../../redux/slice/authSlice";

const AdminUsers = () => {
  const { alluser, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">👥 Users</h2>

      <div className="bg-white rounded-xl shadow-lg p-4 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : alluser?.length > 0 ? (
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
              <tr>
                <th className="px-4 py-3">User ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Total Spent</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alluser.map((user, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition text-center"
                >
                  <td className="px-4 py-3 text-gray-700">{user._id.slice(-6)}</td>
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.orders?.length || 0}</td>
                  <td className="px-4 py-3">₹{user.totalspent || 0}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => dispatch(AdminUpdateUser(user._id))}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Change Role
                    </button>
                    {/* Future: Remove button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
