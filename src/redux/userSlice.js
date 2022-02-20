import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const initialState = { auth: [] };

export const getUserId = createAsyncThunk(
  "getUserById",
  async (params, thunkAPI) => {
    try {
      const res = await authApi.getUserById(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (params, thunkAPI) => {
    try {
      const res = await authApi.regiter(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [getUserId.pending]: (state, action) => {},
    [getUserId.fulfilled]: (state, action) => {
      state.auth = action.payload;
    },
    [getUserId.rejected]: (state, action) => {},

    // register
    [register.pending]: (state, action) => {},
    [register.fulfilled]: (state, action) => {
      state.auth = action.payload;
    },
    [register.rejected]: (state, action) => {},
  },
});

export default authSlice.reducer;
