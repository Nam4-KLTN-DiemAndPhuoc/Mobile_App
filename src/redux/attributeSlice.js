import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import attributeApi from "../api/attributeApi";

const initialState = {
  attributes: [],
};

export const findAttributeByProductId = createAsyncThunk(
  "findAttributeByProductId",
  async (params, thunkAPI) => {
    try {
      const res = await attributeApi.findByproductId(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const attributeSlice = createSlice({
  name: "attributes",
  initialState,
  extraReducers: {
    [findAttributeByProductId.pending]: (state, action) => {},
    [findAttributeByProductId.fulfilled]: (state, action) => {
      state.attributes = action.payload;
    },
    [findAttributeByProductId.rejected]: (state, action) => {},
  },
});

export default attributeSlice.reducer;
