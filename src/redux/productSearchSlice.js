import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi";
const initialState = {
  productSearch: [],
};

export const findAll = createAsyncThunk("findAll", async (params, thunkAPI) => {
  try {
    const res = await productApi.getAll(params);

    return res;
  } catch (error) {
    console.log(error);
  }
});

export const findAllAsc = createAsyncThunk(
  "findAllAsc",
  async (params, thunkAPI) => {
    try {
      const res = await productApi.getAllAsc(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findAllDesc = createAsyncThunk(
  "findAllDesc",
  async (params, thunkAPI) => {
    try {
      const res = await productApi.getAllDesc(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByName = createAsyncThunk(
  "findByName",
  async (params, thunkAPI) => {
    try {
      const res = await productApi.findByName(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByNameAsc = createAsyncThunk(
  "findByNameAsc",
  async (params, thunkAPI) => {
    try {
      const res = await productApi.findByNameAsc(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByNameDesc = createAsyncThunk(
  "findByNameDesc",
  async (params, thunkAPI) => {
    try {
      const res = await productApi.findByNameDesc(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findBySupplier = createAsyncThunk(
  "findBySupplier",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findBySupplier(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByCategory = createAsyncThunk(
  "findByCategory",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategory(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByCategoryAsc = createAsyncThunk(
  "findByCategoryAsc",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategoryAsc(params);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByCategoryDesc = createAsyncThunk(
  "findByCategoryDesc",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategoryDesc(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByCategoryAndName = createAsyncThunk(
  "findByCategoryAndName",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategoryAndName(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByCategoryAndNameAsc = createAsyncThunk(
  "findByCategoryAndNameAsc",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategoryAndNameAsc(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const findByCategoryAndNameDesc = createAsyncThunk(
  "findByCategoryAndNameDesc",
  async (params, { rejectWithValue }) => {
    try {
      const res = await productApi.findByCategoryAndNameDesc(params);

      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {
    clearListProductSearch: (state, action) => {
      state.productSearch = [];
    },
  },
  extraReducers: {
    // get all
    [findAll.pending]: (state, action) => {},
    [findAll.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findAll.rejected]: (state, action) => {},

    // get all asc
    [findAllAsc.pending]: (state, action) => {},
    [findAllAsc.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findAllAsc.rejected]: (state, action) => {},

    // get all desc
    [findAllDesc.pending]: (state, action) => {},
    [findAllDesc.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findAllDesc.rejected]: (state, action) => {},

    // find by name
    [findByName.pending]: (state, action) => {},
    [findByName.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByName.rejected]: (state, action) => {},

    // find by name asc
    [findByNameAsc.pending]: (state, action) => {},
    [findByNameAsc.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByNameAsc.rejected]: (state, action) => {},

    // find by name desc
    [findByNameDesc.pending]: (state, action) => {},
    [findByNameDesc.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByNameDesc.rejected]: (state, action) => {},

    // find by supplier
    [findBySupplier.pending]: (state, action) => {},
    [findBySupplier.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findBySupplier.rejected]: (state, action) => {},

    // find by category
    [findByCategory.pending]: (state, action) => {},
    [findByCategory.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByCategory.rejected]: (state, action) => {},

    // find by category asc
    [findByCategoryAsc.pending]: (state, action) => {},
    [findByCategoryAsc.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByCategoryAsc.rejected]: (state, action) => {},

    // find by category desc
    [findByCategoryDesc.pending]: (state, action) => {},
    [findByCategoryDesc.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByCategoryDesc.rejected]: (state, action) => {},

    // find by categoty and name
    [findByCategoryAndName.pending]: (state, action) => {},
    [findByCategoryAndName.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByCategoryAndName.rejected]: (state, action) => {},

    // find by categoty and name asc
    [findByCategoryAndNameAsc.pending]: (state, action) => {},
    [findByCategoryAndNameAsc.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByCategoryAndNameAsc.rejected]: (state, action) => {},

    // find by categoty and name desc
    [findByCategoryAndNameDesc.pending]: (state, action) => {},
    [findByCategoryAndNameDesc.fulfilled]: (state, action) => {
      state.productSearch = state.productSearch.concat(action.payload);
    },
    [findByCategoryAndNameDesc.rejected]: (state, action) => {},
  },
});

export const { clearListProductSearch } = productSearchSlice.actions;
export default productSearchSlice.reducer;
