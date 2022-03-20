import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "../api/categoryApi";
const initialState = {
  category: [],
  categoryFind: {},
};

export const category = createAsyncThunk(
  "category",
  async (params, thunkAPI) => {
    try {
      const res = await categoryApi.getAllCategory();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
export const findCategoryById = createAsyncThunk(
  "findCategoryById",
  async (params, thunkAPI) => {
    try {
      const res = await categoryApi.getById(params);
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
    // find by id
    [findCategoryById.pending]: (state, action) => {},
    [findCategoryById.fulfilled]: (state, action) => {
      state.categoryFind = action.payload;
    },
    [findCategoryById.rejected]: (state, action) => {},
  },
});

export default categorySlice.reducer;
