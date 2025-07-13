import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Men from "./pages/Men";
import ProductDetail from "./pages/ProductDetail";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import UserDashBoard from "./pages/user/UserDashBoard";
import UserOrders from "./pages/user/UserOrders";
import UserWishlist from "./pages/user/UserWishlist";
import UserHome from "./pages/user/UserHome";
import Signup from "./pages/Signup";
import AdminCreateProduct from "./pages/admin/AdminCreateProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, fetchNewArrivals } from "./redux/slice/productSlice";
import { fetchAllOrders, fetchUserOrders } from "./redux/slice/orderSlice";
import { AllUser } from "./redux/slice/authSlice";
import { fetchUserCart } from "./redux/slice/cartSlice";
import Pagenotfound from "./pages/Pagenotfound";
import AdminAllProducts from "./pages/admin/AdminAllProducts";
import AdminUpdateProduct from "./pages/admin/AdminUpdateProduct";
import Checkout from "./pages/Checkout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./middleware/ProtectedRoute";
import ProtectedAdminRoute from "./middleware/ProtectedAdminRoute";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllOrders());
    dispatch(fetchUserOrders());
    dispatch(AllUser());
    dispatch(fetchUserCart());
    dispatch(fetchNewArrivals());
  }, [dispatch, navigate, user]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:name" element={<Men />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="*" element={<Pagenotfound />} />

                    {/* User Protected */}
                    <Route path="/user" element={<UserDashBoard />}>
                      <Route path="profile" element={<UserHome />} />
                      <Route path="orders" element={<UserOrders />} />
                      <Route path="wishlist" element={<UserWishlist />} />
                    </Route>
                  </Routes>
                </ProtectedRoute>
              }
            />
            {/* Admin Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            >
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="create" element={<AdminCreateProduct />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="products" element={<AdminAllProducts />} />
              <Route
                path="updateproduct/:id"
                element={<AdminUpdateProduct />}
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
