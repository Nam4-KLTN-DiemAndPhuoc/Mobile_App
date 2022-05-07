import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addressApi from "../api/addressApi";

const initialState = {
  address: null,
  messageError: null,
};

export const findAddressByUserId = createAsyncThunk(
  "findAddressByUserId",
  async (params, { rejectWithValue }) => {
    try {
      const res = await addressApi.findByUserId(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAddress = createAsyncThunk(
  "addAddress",
  async (params, { rejectWithValue }) => {
    try {
      const res = await addressApi.addAddress(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "updateAddress",
  async (params, { rejectWithValue }) => {
    try {
      const res = await addressApi.updateAddress(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,

  extraReducers: {
    // findById
    [findAddressByUserId.pending]: (state, action) => {},
    [findAddressByUserId.fulfilled]: (state, action) => {
      state.address = action.payload;
    },
    [findAddressByUserId.rejected]: (state, action) => {
      state.messageError = action.payload;
    },

    // add address
    [addAddress.pending]: (state, action) => {},
    [addAddress.fulfilled]: (state, action) => {
      state.address = action.payload;
    },
    [addAddress.rejected]: (state, action) => {
      state.messageError = action.payload;
    },

    // update address
    [updateAddress.pending]: (state, action) => {},
    [updateAddress.fulfilled]: (state, action) => {
      state.address = action.payload;
    },
    [updateAddress.rejected]: (state, action) => {
      state.messageError = action.payload;
    },
  },
});

export default addressSlice.reducer;
