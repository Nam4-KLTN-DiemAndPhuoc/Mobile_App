import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentApi from "../api/commentApi";

const initialState = {
  comments: [],
};

export const findCommentByProductId = createAsyncThunk(
  "findCommentByProductId",
  async (params, thunkAPI) => {
    try {
      const res = await commentApi.findByProductId(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    // findCommentByProductId
    [findCommentByProductId.pending]: (state, action) => {},
    [findCommentByProductId.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [findCommentByProductId.rejected]: (state, action) => {},
  },
});

export default commentSlice.reducer;
