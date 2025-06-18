import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const apiurl = import.meta.env.VITE_BACKEND_URL;

const userfromstorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Thunk to login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${apiurl}/api/users/login`, credentials);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      return res.data.user; // assume backend returns { user: {...} }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || "Login failed"
      );
    }
  }
);

// Thunk to register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(`${apiurl}/api/users/register`, credentials);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || "Registration failed"
      );
    }
  }
);

export const AllUser = createAsyncThunk("auth/allUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${apiurl}/api/users/alluser`);
    return res.data.users;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response.data.message || "all user failed"
    );
  }
});

export const AdminUpdateUser = createAsyncThunk(
  "auth/adminupdateuser",
  async (id, thunkAPI) => {
    try {
      console.log("====================================");
      console.log(id);
      console.log("====================================");
      const res = await axios.put(`${apiurl}/api/users/adminupdateuser/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || "all user failed"
      );
    }
  }
);

export const UpdateProfile = createAsyncThunk(
  "auth/updateprofile",
  async (data, thunkAPI) => {
    try {
      const res = await axios.put(`${apiurl}/api/users/updateprofile`, {
        name: data,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data.message || "all user failed"
      );
    }
  }
);

// Thunk to check session on page load
// export const checkAuth = createAsyncThunk(
//   "auth/checkAuth",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get(`${apiurl}/api/users/profile`); // returns current user if cookie is valid
//       return res.data.user;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Not authenticated");
//     }
//   }
// );

// Thunk to logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.get(`${apiurl}/api/users/logout`);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {
      console.log(err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userfromstorage,
    alluser: [],
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
      // .addCase(checkAuth.fulfilled, (state, action) => {
      //   state.user = action.payload;
      //   state.isAuthenticated = true;
      // })
      // .addCase(checkAuth.rejected, (state) => {
      //   state.user = null;
      //   state.isAuthenticated = false;
      // })

      // alluser
      .addCase(AllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(AllUser.fulfilled, (state, action) => {
        state.alluser = action.payload;
        state.loading = false;

        // state.isAuthenticated = true;
      })
      .addCase(AllUser.rejected, (state) => {
        state.alluser = null;
        // state.isAuthenticated = false;
        state.error = action.payload;
        state.loading = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(AdminUpdateUser.fulfilled, (state, action) => {
        const user = state.alluser.find(
          (item) => item._id === action.payload._id
        );
        if (user) {
          user.role = action.payload.role;
        }
      });
  },
});

export default authSlice.reducer;
