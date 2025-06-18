import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;
const apiurl = import.meta.env.VITE_BACKEND_URL;

// 🔄 Get Cart
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${apiurl}/api/carts/usercart`);
      console.log('====================================');
      console.log(res.data.cart);
      console.log('====================================');
      return res.data.cart; // since .find returns an array
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// ➕ Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity,color,size }, thunkAPI) => {
    try {
      console.log(productId, quantity);
      const res = await axios.post(`${apiurl}/api/carts/addtocart`, {
        productId,
        quantity,
        color,
        size
      });
    toast.success("Product added to cart")
     console.log('====================================');
     console.log(res.data.cart);
     console.log('====================================');
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// 🔁 Update Cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, action }, thunkAPI) => {
    try {
      const res = await axios.put(`${apiurl}/api/carts/updatecart`, {
        productId,
        action,
      });
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// ❌ Remove Item from Cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      const res = await axios.delete(`${apiurl}/api/carts/removecartitem`, {
        data: { productId },
      });
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    cartcount:0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
state.cartcount=action.payload.products.reduce((acc,item)=>acc+item.quantity,0);
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
