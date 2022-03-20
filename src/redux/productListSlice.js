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

const productListSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    // get all
    [getAll.pending]: (state, action) => {},
    [getAll.fulfilled]: (state, action) => {
      state.products = state.products.concat(action.payload);
    },
    [getAll.rejected]: (state, action) => {},
  },
});

export default productListSlice.reducer;
