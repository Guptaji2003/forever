// redux/slice/orderSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const apiurl = import.meta.env.VITE_BACKEND_URL;

// ✅ Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk("order/fetchAllOrders", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${apiurl}/api/orders/allorders`);
    return res.data.orders;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// ✅ Fetch user orders
export const fetchUserOrders = createAsyncThunk("order/fetchUserOrders", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${apiurl}/api/orders/user-orders`);
    return res.data.orders;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// ✅ Fetch single order
export const fetchSingleOrder = createAsyncThunk("order/fetchSingleOrder", async (id, thunkAPI) => {
  try {
    const res = await axios.get(`${apiurl}/api/order/order/${id}`);
    return res.data.order;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// ✅ Update order status (admin only)
export const updateOrderStatus = createAsyncThunk("order/updateOrderStatus", async ({ id, status }, thunkAPI) => {
  try {
    const res = await axios.put(`${apiurl}/api/order/updateorder/${id}`, { status });
    return res.data.order;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// ✅ Delete order
export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id, thunkAPI) => {
  try {
    await axios.delete(`${apiurl}/api/order/deleteorder/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    allOrders: [],
    userOrders: [],
    totalRevenue:0,
    totalspent:0,
    singleOrder: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ All Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
         state.totalRevenue = action.payload.reduce((acc, order) => acc + order.totalamount, 0);
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
         state.totalspent = action.payload.reduce((acc, order) => acc + order.totalamount, 0);

      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Single Order
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Order
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.allOrders = state.allOrders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })

      // ✅ Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.allOrders = state.allOrders.filter(order => order._id !== action.payload);
      });
  },
});

export default orderSlice.reducer;
