import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import orderReducer from "./slice/orderSlice";
import cartReducer from "./slice/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
    cart:cartReducer
  },
});
export default store;
