import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

const initialState = {
  orders: null,
  messageError: null,
};

export const findOrdersByUserId = createAsyncThunk(
  "findOrdersByUserId",
  async (params, { rejectWithValue }) => {
    try {
      const res = await orderApi.getOrdersByUser(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
  "addOrder",
  async (params, { rejectWithValue }) => {
    try {
      const res = await orderApi.addOrder(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOrderDetail = createAsyncThunk(
  "addOrderDetail",
  async (params, { rejectWithValue }) => {
    try {
      const res = await orderApi.addOrderDetail(params);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state, action) => {
      state.orders = null;
    },
  },

  extraReducers: {
    // findOrdersByUserId
    [findOrdersByUserId.pending]: (state, action) => {},
    [findOrdersByUserId.fulfilled]: (state, action) => {
      const arr = action.payload;
      state.orders = arr.reverse();
    },
    [findOrdersByUserId.rejected]: (state, action) => {
      state.messageError = action.payload;
    },

    // add order
    [addOrder.pending]: (state, action) => {},
    [addOrder.fulfilled]: (state, action) => {
      const arr = state.orders.reverse();
      arr.push(action.payload);
      state.orders = arr.reverse();
    },
    [addOrder.rejected]: (state, action) => {
      state.messageError = action.payload;
    },
  },
});

export const { clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
