import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { combineReducers } from "redux";
import advertisementSlice from "./advertisementSlice";
import productListSlice from "./productListSlice";
import categorySlice from "./categorySlice";
import productSearchSlice from "./productSearchSlice";
import ProductSlice from "./ProductSlice";
import commentSlice from "./commentSlice";
import imageProductSlice from "./imageProductSlice";
import supplierSlice from "./supplierSlice";
import attributeSlice from "./attributeSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  advertisement: advertisementSlice,
  productList: productListSlice,
  category: categorySlice,
  productSearch: productSearchSlice,
  product: ProductSlice,
  comment: commentSlice,
  image: imageProductSlice,
  suppliers: supplierSlice,
  attribute: attributeSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
