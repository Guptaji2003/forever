// src/redux/slice/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Base API
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

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
      console.log('====================================');
      console.log(id,updates);
      console.log('====================================');
      const res = await axios.put(`${BASE_URL}/api/products/updateproduct/${id}`, updates);
      console.log('====================================');
      console.log(res.data.product);
      console.log('====================================');
      // return res.data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/api/products/deleteproduct/${id}`);
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

// export const filterProductsByQuery = createAsyncThunk(
//   "product/filter",
//   async (query) => {
//     const res = await axios.get(`${BASE_URL}/api/products?${query}`);
//     return res.data;
//   }
// );

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

export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async ({ category, minprice, maxprice, search, sort }, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();

      if (category) queryParams.append("category", category);
      if (minprice) queryParams.append("minprice", minprice);
      if (maxprice) queryParams.append("maxprice", maxprice);
      if (search) queryParams.append("search", search);
      if (sort) queryParams.append("sort", sort);

      const res = await axios.get(
        `${BASE_URL}/api/products/filter?${queryParams.toString()}`
      );
console.log('====================================');
console.log(res.data.products);
console.log('====================================');
      return res.data.products;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch filtered products"
      );
    }
  }
);

// ================== SLICE ==================

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    totalProduct:0,
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
        state.totalProduct=action.payload.length;
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
      // .addCase(updateProduct.fulfilled, (state, action) => {
      //   const index = state.allProducts.findIndex(
      //     (p) => p._id === action.payload._id
      //   );
      //   if (index !== -1) {
      //     state.allProducts[index] = action.payload;
      //   }
      // })

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
      })
      //filter
       .addCase(filterProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
        state.loading = false;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
