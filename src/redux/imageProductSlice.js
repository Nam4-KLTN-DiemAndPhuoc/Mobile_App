import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imageApi from "../api/imageApi";
const initialState = {
  images: [],
};

export const findImageByProductId = createAsyncThunk(
  "findImageByProductId",
  async (params, thunkAPI) => {
    try {
      const res = await imageApi.getByProductId(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const imageProductSlice = createSlice({
  name: "images",
  initialState,
  extraReducers: {
    // findImageByProductId
    [findImageByProductId.pending]: (state, action) => {},
    [findImageByProductId.fulfilled]: (state, action) => {
      state.images = action.payload;
    },
    [findImageByProductId.rejected]: (state, action) => {
      console.log("ERROR");
    },
  },
});

export default imageProductSlice.reducer;
