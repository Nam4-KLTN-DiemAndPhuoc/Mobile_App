import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "../api/categoryApi";
const initialState = {
  category: [],
};

export const category = createAsyncThunk(
  "category",
  async (params, thunkAPI) => {
    try {
      const res = await categoryApi.getAllCategory();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {
    [category.pending]: (state, action) => {},
    [category.fulfilled]: (state, action) => {
      state.category = action.payload;
    },
    [category.rejected]: (state, action) => {},
  },
});

export default categorySlice.reducer;
