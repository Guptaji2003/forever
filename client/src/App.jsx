import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "./redux/slice/productSlice";
import { fetchAllOrders, fetchUserOrders } from "./redux/slice/orderSlice";
import { AllUser } from "./redux/slice/authSlice";
import { fetchUserCart } from "./redux/slice/cartSlice";
import Pagenotfound from "./pages/Pagenotfound";
// import { checkAuth } from "./redux/slice/authSlice";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllOrders());
    dispatch(fetchUserOrders());
    dispatch(AllUser());
    dispatch(fetchUserCart());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<Men />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="create" element={<AdminCreateProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
        <Route path="/user" element={<UserDashBoard />}>
          <Route path="profile" element={<UserHome />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="wishlist" element={<UserWishlist />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
