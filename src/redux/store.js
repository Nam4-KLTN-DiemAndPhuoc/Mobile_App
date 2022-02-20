import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userReducer: userSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
