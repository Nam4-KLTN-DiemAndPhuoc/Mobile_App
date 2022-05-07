import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  token: null,
  messageError: null,
};

export const login = createAsyncThunk(
  "login",
  async (params, { rejectWithValue }) => {
    try {
      const res = await authApi.login(params);
      if (res.token) {
        await AsyncStorage.setItem("token", res.token);
      }

      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (params, thunkAPI) => {
    try {
      const res = await authApi.regiter(params);
      await AsyncStorage.setItem("token", res.token);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (params, { rejectWithValue }) => {
    try {
      const res = await authApi.refreshToken();
      await AsyncStorage.setItem("token", res.token);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("logout", async (params, thunkAPI) => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async (params, { rejectWithValue }) => {
    console.log(params);
    try {
      const res = await authApi.updateUser(params);
      console.log("AAAAAAAAAAAA", res);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: {
    // login
    [login.pending]: (state, action) => {},
    [login.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.messageError = null;
    },
    [login.rejected]: (state, action) => {
      state.messageError = action.payload;
    },

    // logout
    [logout.pending]: (state, action) => {},
    [logout.fulfilled]: (state, action) => {
      state.token = null;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {},

    // register
    [register.pending]: (state, action) => {},
    [register.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [register.rejected]: (state, action) => {},

    // refreshToken
    [refreshToken.pending]: (state, action) => {},
    [refreshToken.fulfilled]: (state, action) => {
      if (state.token) {
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    },
    [refreshToken.rejected]: (state, action) => {
      console.log("Token hết hạn vui lòng đăng nhập lại");
    },

    // login
    [updateUser.pending]: (state, action) => {},
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.messageError = action.payload;
    },
  },
});

export default authSlice.reducer;
