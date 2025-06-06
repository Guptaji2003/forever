// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Automatically send cookies with requests
axios.defaults.withCredentials = true;
const apiurl = import.meta.env.VITE_BACKEND_URL;
console.log('====================================');
console.log(apiurl);
console.log('====================================');
// Thunk to login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${apiurl}/api/users/login`, credentials);
      return res.data.user; // assume backend returns { user: {...} }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Login failed');
    }
  }
);

// Thunk to register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${apiurl}/api/users/register`, credentials);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || 'Registration failed');
    }
  }
);

// Thunk to check session on page load
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${apiurl}/api/users/me`); // returns current user if cookie is valid
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue('Not authenticated');
    }
  }
);

// Thunk to logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await axios.get(`${apiurl}/api/users/logout`);
    } catch (err) {
      console.log(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // REGISTER
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      // CHECK AUTH
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
