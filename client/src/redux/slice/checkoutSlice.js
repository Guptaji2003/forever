import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { toast } from "react-toastify";

axios.defaults.withCredentials = true;
const apiurl = import.meta.env.VITE_BACKEND_URL;

// CREATE CHECKOUT
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiurl}/api/checkouts/create-checkout`,
        checkoutData
      );
      // toast.success("Checkout created successfully");
      console.log('====================================');
      console.log(res.data.checkout);
      console.log('====================================');
      return res.data.checkout;
    } catch (err) {
      toast.error("Failed to create checkout");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE CHECKOUT (mark as paid)
export const updateCheckout = createAsyncThunk(
  "checkout/updateCheckout",
  async ({ id, paymentStatus, paymentDetails }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${apiurl}/api/checkouts/update-checkout/${id}`,
        {
          paymentStatus,
          paymentDetails,
        }
      );
      // toast.success("Checkout updated successfully");
      console.log('====================================');
      console.log(res.data.checkout);
      console.log('====================================');
      return res.data.checkout;
    } catch (err) {
      toast.error("Failed to update checkout");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// FINALIZE CHECKOUT (convert to order)
export const finalizeCheckout = createAsyncThunk(
  "checkout/finalizeCheckout",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiurl}/api/checkouts/final-checkout/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Order placed successfully");
      return res.data.finalorder;
    } catch (err) {
      toast.error("Finalization failed");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkoutInfo: null,
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCheckoutState: (state) => {
      state.checkoutInfo = null;
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Checkout
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutInfo = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Checkout
      .addCase(updateCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutInfo = action.payload;
      })
      .addCase(updateCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Finalize Checkout
      .addCase(finalizeCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finalizeCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(finalizeCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCheckoutState } = checkoutSlice.actions;
export default checkoutSlice.reducer;
