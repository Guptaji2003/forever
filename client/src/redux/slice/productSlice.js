// src/redux/slice/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// ================== ASYNC THUNKS ==================

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async () => {
    const res = await axios.get(`${BASE_URL}/api/products/allproduct`);
    return res.data.products;
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, thunkAPI) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/products/createproduct`,
        productData
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, updates }, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/products/${id}`, updates);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "product/newArrivals",
  async () => {
    const res = await axios.get(`${BASE_URL}/api/products/newarrivals`);
    return res.data.products;
  }
);

export const filterProductsByQuery = createAsyncThunk(
  "product/filter",
  async (query) => {
    const res = await axios.get(`${BASE_URL}/api/products?${query}`);
    return res.data;
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingle",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/products/singleproduct/${id}`
      );
      console.log('====================================');
      console.log(res.data);
      console.log('====================================');
      return res.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  "product/related",
  async (id) => {
    const res = await axios.get(
      `${BASE_URL}/api/products/relatedproducts/${id}`
    );
    console.log("====================================");
    console.log(res.data);
    console.log("====================================");
    return res.data.products;
  }
);

// ================== SLICE ==================

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    singleProduct: null,
    newArrivals: [],
    filteredProducts: [],
    relatedProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.allProducts.push(action.payload);
      })

      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.allProducts.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter(
          (p) => p._id !== action.payload
        );
      })

      // New Arrivals
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.newArrivals = action.payload;
      })

      // Filtered Products
      .addCase(filterProductsByQuery.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
      })
      // Single product fetched
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.loading = true;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Related Products
      .addCase(fetchRelatedProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
