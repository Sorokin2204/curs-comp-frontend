import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const createBrand = createAsyncThunk('brand/createBrand', (brandName, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/brand/create`, { name: brandName })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const updateBrand = createAsyncThunk('brand/updateBrand', (brand, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/brand/update`, { name: brand.name, id: brand.id })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const deleteBrand = createAsyncThunk('brand/deleteBrand', (brandId, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/brand/delete`, { id: brandId })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getBrands = createAsyncThunk('brand/getBrands', (obj, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/brand/list`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const brandInitialState = {
  createBrandState: {
    data: null,
    loading: false,
    error: null,
  },
  updateBrandState: {
    data: null,
    loading: false,
    error: null,
  },
  deleteBrandState: {
    data: null,
    loading: false,
    error: null,
  },
  getBrandsState: {
    data: null,
    loading: false,
    error: null,
  },
  brandModal: false,
  activeBrand: null,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState: brandInitialState,
  reducers: {
    brandReset: (state, action) => {
      state.createBrandState = brandInitialState.createBrandState;
      state.updateBrandState = brandInitialState.updateBrandState;
      state.deleteBrandState = brandInitialState.deleteBrandState;
      state.activeBrand = null;
    },
    closeBrandModal: (state) => {
      state.brandModal = false;
      state.activeBrand = null;
    },
    openBrandModal: (state) => {
      state.brandModal = true;
    },
    setActiveBrand: (state, { payload }) => {
      state.activeBrand = payload;
      state.brandModal = true;
    },
  },
  extraReducers: {
    // CREATE
    [createBrand.pending]: (state, action) => {
      state.createBrandState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [createBrand.fulfilled]: (state, action) => {
      state.createBrandState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.brandModal = false;
    },
    [createBrand.rejected]: (state, action) => {
      state.createBrandState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // GET
    [getBrands.pending]: (state, action) => {
      state.getBrandsState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getBrands.fulfilled]: (state, action) => {
      state.getBrandsState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getBrands.rejected]: (state, action) => {
      state.getBrandsState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // UPDATE
    [updateBrand.pending]: (state, action) => {
      state.updateBrandState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [updateBrand.fulfilled]: (state, action) => {
      state.updateBrandState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.brandModal = false;
    },
    [updateBrand.rejected]: (state, action) => {
      state.updateBrandState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // DELETE
    [deleteBrand.pending]: (state, action) => {
      state.deleteBrandState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [deleteBrand.fulfilled]: (state, action) => {
      state.deleteBrandState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.brandModal = false;
    },
    [deleteBrand.rejected]: (state, action) => {
      state.deleteBrandState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { brandReset, closeBrandModal, openBrandModal, setActiveBrand } = brandSlice.actions;
export const brandReducer = brandSlice.reducer;
