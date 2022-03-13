import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { combineReducers } from "redux";
import advertisementSlice from "./advertisementSlice";
import productListSlice from "./productListSlice";
import categorySlice from "./categorySlice";

const rootReducer = combineReducers({
  auth: authSlice,
  advertisement: advertisementSlice,
  productList: productListSlice,
  category: categorySlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
