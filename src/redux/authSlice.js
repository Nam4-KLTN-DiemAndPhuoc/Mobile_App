import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  token: null,
};

export const login = createAsyncThunk("login", async (params, thunkAPI) => {
  try {
    const res = await authApi.login(params);

    await AsyncStorage.setItem("token", res.token);

    return res;
  } catch (error) {
    console.log(error);
  }
});

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
  async (params, thunkAPI) => {
    try {
      const res = await authApi.refreshToken();
      await AsyncStorage.setItem("token", res.token);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // thay doi state
    logout: async (state, action) => {
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {},
    [login.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {},

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
  },
});

const { reducer, actions } = authSlice;
export const { logout } = actions;
export default reducer;
