import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import orderReducer from "./slice/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
  },
});
export default store;
