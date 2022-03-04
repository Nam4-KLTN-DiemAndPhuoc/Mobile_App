import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
