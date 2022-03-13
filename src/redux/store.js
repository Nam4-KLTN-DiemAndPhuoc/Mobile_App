import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { combineReducers } from "redux";
import advertisementSlice from "./advertisementSlice";
import productListSlice from "./productListSlice";
import supplierSlice from "./supplierSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  advertisement: advertisementSlice,
  productList: productListSlice,
  suppliers: supplierSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
