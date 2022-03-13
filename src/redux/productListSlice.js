import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

const initialState = {
  products: [],
};

export const getAll = createAsyncThunk("getAll", async (params, thunkAPI) => {
  try {
    const res = await productApi.getAll(params);

    return res;
  } catch (error) {
    console.log(error);
  }
});

export const findByName = createAsyncThunk(
  "findByName",
  async (params, thunkAPI) => {
    try {
      const res = await productApi.findByName(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const productListSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    // get all
    [getAll.pending]: (state, action) => {},
    [getAll.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getAll.rejected]: (state, action) => {},

    // find by name
    [findByName.pending]: (state, action) => {},
    [findByName.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [findByName.rejected]: (state, action) => {},
  },
});

export default productListSlice.reducer;
