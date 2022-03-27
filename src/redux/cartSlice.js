import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";

const initialState = {
  cart: {},
  cartDetails: [],
  cartDetailsDefault: [],
};
export const getCart = createAsyncThunk("getCart", async (params, thunkAPI) => {
  try {
    const res = await cartApi.getByUser(params);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getCartDetail = createAsyncThunk(
  "getCartDetail",
  async (params, thunkAPI) => {
    try {
      const res = await cartApi.getCartDetail(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addCartDetail = createAsyncThunk(
  "addCartDetail",
  async (params, thunkAPI) => {
    try {
      const res = await cartApi.addCartDetail(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addCartDetailDefault: (state, action) => {
      state.cartDetailsDefault.push(action.payload);
    },
    clearCartDetailDefault: (state, action) => {
      state.cartDetailsDefault = [];
    },
  },
  extraReducers: {
    // get cart
    [getCart.pending]: (state, action) => {},
    [getCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
    [getCart.rejected]: (state, action) => {},

    // getCartDetail
    [getCartDetail.pending]: (state, action) => {},
    [getCartDetail.fulfilled]: (state, action) => {
      state.cartDetails = action.payload;
    },
    [getCartDetail.rejected]: (state, action) => {},

    // addCartDetail
    [addCartDetail.pending]: (state, action) => {},
    [addCartDetail.fulfilled]: (state, action) => {
      state.cartDetails.push(action.payload);
    },
    [addCartDetail.rejected]: (state, action) => {},
  },
});

export const { addCartDetailDefault, clearCartDetailDefault } =
  cartSlice.actions;
export default cartSlice.reducer;
