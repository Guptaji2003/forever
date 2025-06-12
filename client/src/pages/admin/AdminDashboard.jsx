import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-180 bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white p-5 ${
          open ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold ${!open && "hidden"}`}>
            Admin Panel
          </h1>
          {/* <button className="p-2 bg-gray-700 rounded" onClick={() => setOpen(!open)}>☰</button> */}
        </div>
        <nav className="mt-5 space-y-4">
          <a
            href="/admin/dashboard"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Dashboard
          </a>
          <a
            href="/admin/create"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Create Product
          </a>
          <a
            href="/admin/orders"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Orders
          </a>
          <a
            href="/admin/users"
            className="block p-2 hover:bg-blue-700 rounded"
          >
            Users
          </a>
          {/* <a href="#" className="block p-2 hover:bg-blue-700 rounded">Outlets</a> */}
        </nav>
      </div>

      {/* Main Content */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
