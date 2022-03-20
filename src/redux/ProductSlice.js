import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

const initialState = {
  product: {},
};

export const getProductById = createAsyncThunk(
  "getProductById",
  async (params, thunkAPI) => {
    try {
      const res = await productApi.getById(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    // get by id
    [getProductById.pending]: (state, action) => {},
    [getProductById.fulfilled]: (state, action) => {
      state.product = action.payload;
    },
    [getProductById.rejected]: (state, action) => {},
  },
});

export default ProductSlice.reducer;
