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

export const addComment = createAsyncThunk(
  "addComment",
  async (params, thunkAPI) => {
    try {
      const res = await commentApi.addComment(params);
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
      const arr = action.payload.reverse();
      state.comments = arr;
    },
    [findCommentByProductId.rejected]: (state, action) => {},

    // addComment
    [addComment.pending]: (state, action) => {},
    [addComment.fulfilled]: (state, action) => {
      const arr = state.comments.reverse();
      arr.push(action.payload);
      state.comments = arr.reverse();
    },
    [addComment.rejected]: (state, action) => {},
  },
});

export default commentSlice.reducer;
