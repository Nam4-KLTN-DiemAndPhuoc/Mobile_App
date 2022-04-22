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
    console.log("BBBBBBBBBBBBBBBBBBBBBBBB", res);
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
      console.log(params);
      const res = await cartApi.addCartDetail(params);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCartDetail = createAsyncThunk(
  "deleteCartDetail",
  async (params, thunkAPI) => {
    try {
      const res = await cartApi.deleteCartDetail(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCartDetail = createAsyncThunk(
  "updateCartDetail",
  async (params, thunkAPI) => {
    try {
      const res = await cartApi.updateCartDetail(params);
      console.log(res);
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
      const p = state.cartDetailsDefault?.find(
        (cartDetail) => cartDetail.product.id == action.payload.product.id
      );
      if (p) {
        p.cartDetail.amount =
          p.cartDetail.amount + action.payload.cartDetail.amount;
      } else {
        state.cartDetailsDefault.push(action.payload);
      }
    },
    clearCartDetailDefault: (state, action) => {
      state.cartDetailsDefault = [];
    },
    clearCartDetail: (state, action) => {
      state.cartDetails = [];
    },
    deleteCartDetailDefault: (state, action) => {
      const array = state.cartDetailsDefault.filter(
        (cartDetail) => cartDetail.product.id != action.payload
      );
      state.cartDetailsDefault = array;
    },
    updateCartDetailDefault: (state, action) => {
      const p = state.cartDetailsDefault?.find(
        (cartDetail) => cartDetail.product.id == action.payload.product.id
      );
      if (p) {
        p.cartDetail.amount = action.payload.cartDetail.amount;
      }
    },
  },
  extraReducers: {
    // get cart
    [getCart.pending]: (state, action) => {},
    [getCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
      console.log("BBBBBBBBBBBBBBB", state.cart);
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
      const p = state.cartDetails?.find(
        (cartDetail) =>
          cartDetail.product.id == action.payload.product?.id &&
          cartDetail.cartDetail.attributeId ==
            action.payload.cartDetail.attributeId
      );
      if (p) {
        p.cartDetail.amount = action.payload.cartDetail.amount;
      } else {
        console.log(action.payload);
        state.cartDetails.push(action.payload);
      }
    },
    [addCartDetail.rejected]: (state, action) => {},

    // delete
    [deleteCartDetail.pending]: (state, action) => {},
    [deleteCartDetail.fulfilled]: (state, action) => {
      const array = state.cartDetails.filter(
        (cartDetail) => cartDetail.cartDetail.id != action.payload
      );

      state.cartDetails = array;
    },
    [deleteCartDetail.rejected]: (state, action) => {},

    // updateCartDetail
    [updateCartDetail.pending]: (state, action) => {},
    [updateCartDetail.fulfilled]: (state, action) => {
      const p = state.cartDetails?.find(
        (cartDetail) => cartDetail.cartDetail.id == action.payload.cartDetail.id
      );
      if (p) {
        p.cartDetail.amount = action.payload.cartDetail.amount;
      }
    },
    [updateCartDetail.rejected]: (state, action) => {},
  },
});

export const {
  addCartDetailDefault,
  clearCartDetailDefault,
  clearCartDetail,
  deleteCartDetailDefault,
  updateCartDetailDefault,
} = cartSlice.actions;
export default cartSlice.reducer;
