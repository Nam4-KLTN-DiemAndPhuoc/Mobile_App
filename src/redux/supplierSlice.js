import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supplierApi from "../api/supplierApi";
const initialState = {
  suppliers: [],
};

export const suppliers = createAsyncThunk(
  "suppliers",
  async (params, thunkAPI) => {
    try {
      const res = await supplierApi.getAllSupplier();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  extraReducers: {
    [suppliers.pending]: (state, action) => {},
    [suppliers.fulfilled]: (state, action) => {
      state.suppliers = action.payload;
    },
    [suppliers.rejected]: (state, action) => {},
  },
});

export default supplierSlice.reducer;
