import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

const initialState = {
  advertisements: [],
};

export const advertisement = createAsyncThunk(
  "advertisement",
  async (params, thunkAPI) => {
    try {
      const res = await productApi.getTop3();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const advertisementSlice = createSlice({
  name: "advertisement",
  initialState,
  extraReducers: {
    [advertisement.pending]: (state, action) => {},
    [advertisement.fulfilled]: (state, action) => {
      state.advertisements = action.payload;
    },
    [advertisement.rejected]: (state, action) => {},
  },
});

export default advertisementSlice.reducer;
