import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supplierApi from "../api/supplierApi";

const initialState = {
  supplier: {},
};

export const findSupplierById = createAsyncThunk(
  "findSupplierById",
  async (params, thunkAPI) => {
    try {
      const res = await supplierApi.findById(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  extraReducers: {
    // find by id
    [findSupplierById.pending]: (state, action) => {},
    [findSupplierById.fulfilled]: (state, action) => {
      state.supplier = action.payload;
    },
    [findSupplierById.rejected]: (state, action) => {},
  },
});

export default supplierSlice.reducer;
