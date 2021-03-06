import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const createProduct = createAsyncThunk('product/createProduct', (formData, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/product/create`, formData)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const updateProduct = createAsyncThunk('product/updateProduct', (formData, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/product/update`, formData)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', (productId, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/product/delete`, { id: productId })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getProducts = createAsyncThunk('product/getProducts', (params, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/product/list`, { params: { ...params } })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getSingleProduct = createAsyncThunk('product/getSingleProduct', (productId, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/product/${productId}`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const searchProducts = createAsyncThunk('product/searchProducts', (search, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/product/search/${search}`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const productInitialState = {
  createProductState: {
    data: null,
    loading: false,
    error: null,
  },
  updateProductState: {
    data: null,
    loading: false,
    error: null,
  },
  getProductsState: {
    data: null,
    loading: false,
    error: null,
  },
  getSingleProductState: {
    data: null,
    loading: false,
    error: null,
  },
  searchProductsState: {
    data: null,
    loading: false,
    error: null,
  },
  deleteProductState: {
    data: null,
    loading: false,
    error: null,
  },
  activeProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState: productInitialState,
  reducers: {
    setActiveProduct: (state, { payload }) => {
      state.activeProduct = { ...payload };
    },
    productReset: (state, action) => {
      state.createProductState = productInitialState.createProductState;
      state.updateProductState = productInitialState.updateProductState;
      state.getProductsState = productInitialState.getProductsState;
      state.getSingleProductState = productInitialState.getSingleProductState;
      state.searchProductsState = productInitialState.searchProductsState;
      state.deleteProductState = productInitialState.deleteProductState;
      state.activeProduct = null;
    },
  },
  extraReducers: {
    // CREATE
    [createProduct.pending]: (state, action) => {
      state.createProductState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [createProduct.fulfilled]: (state, action) => {
      state.createProductState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.productModal = false;
    },
    [createProduct.rejected]: (state, action) => {
      state.createProductState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // GET
    [getProducts.pending]: (state, action) => {
      state.getProductsState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getProducts.fulfilled]: (state, action) => {
      state.getProductsState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getProducts.rejected]: (state, action) => {
      state.getProductsState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // UPDATE
    [updateProduct.pending]: (state, action) => {
      state.updateProductState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.updateProductState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.productModal = false;
    },
    [updateProduct.rejected]: (state, action) => {
      state.updateProductState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    [getSingleProduct.pending]: (state, action) => {
      state.getSingleProductState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.getSingleProductState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.productModal = false;
    },
    [getSingleProduct.rejected]: (state, action) => {
      state.getSingleProductState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    [searchProducts.pending]: (state, action) => {
      state.searchProductsState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.searchProductsState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.productModal = false;
    },
    [searchProducts.rejected]: (state, action) => {
      state.searchProductsState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // DELETE
    [deleteProduct.pending]: (state, action) => {
      state.deleteProductState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.deleteProductState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.productModal = false;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.deleteProductState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { productReset, closeProductModal, openProductModal, setActiveProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
