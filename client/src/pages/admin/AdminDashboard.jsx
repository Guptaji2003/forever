import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchAllOrders } from "../../redux/slice/orderSlice";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
//   const dispatch=useDispatch();
// useEffect(() => {
// dispatch(fetchAllOrders());
// }, [dispatch])

  return (
    <div data-aos="fade-up" className="flex min-h-[calc(100vh-4rem)] mt-16">
      {" "}
      {/* Adjusts for Navbar height */}
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 h-screen bg-blue-900 text-white transition-all duration-300 
        ${open ? "w-64" : "w-0"} overflow-hidden lg:w-64`}
      >
        <div className="flex flex-col h-full justify-between p-4">
          <div>
            <div className="flex justify-between">
              {" "}
              <h2 className="text-lg font-bold mb-6">Admin Panel</h2>
              <X className="w-6 h-6" onClick={() => setOpen(!open)}/>
            </div>
            <nav className="space-y-2">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-blue-700 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                📊 Dashboard
              </NavLink>
              <NavLink
                to="/admin/create"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-blue-700 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                ➕ Create Product
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-blue-700 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                📦 Orders
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-blue-700 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                👥 Users
              </NavLink>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-blue-700 ${
                    isActive ? "bg-blue-700" : ""
                  }`
                }
              >
                🗂️ All Products
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 lg:ml-64  w-full">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden mb-4 z-100 text-blue-900"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
