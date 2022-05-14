import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
export const createCategory = createAsyncThunk('category/createCategory', (categoryName, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/category/create`, { name: categoryName })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const updateCategory = createAsyncThunk('category/updateCategory', (category, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/category/update`, { name: category.name, id: category.id })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', (categoryId, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/category/delete`, { id: categoryId })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getCategories = createAsyncThunk('category/getCategories', (obj, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/category/list`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const categoryInitialState = {
  createCategoryState: {
    data: null,
    loading: false,
    error: null,
  },
  updateCategoryState: {
    data: null,
    loading: false,
    error: null,
  },
  deleteCategoryState: {
    data: null,
    loading: false,
    error: null,
  },
  getCategoriesState: {
    data: null,
    loading: false,
    error: null,
  },

  categoryAttributes: [],
  activeCategory: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState: categoryInitialState,
  reducers: {
    categoryReset: (state, action) => {
      state.createCategoryState = categoryInitialState.createCategoryState;
      state.updateCategoryState = categoryInitialState.updateCategoryState;
      state.getCategoriesState = categoryInitialState.getCategoriesState;
      state.activeCategory = null;
      state.categoryAttributes = [];
    },
    updateCategoryAttribute: (state, { payload }) => {
      console.log(payload);
      const indexOldAttribute = current(state.categoryAttributes).findIndex((attr) => attr.name === payload.oldName);
      state.categoryAttributes[indexOldAttribute] = _.omit(payload, 'oldName');
    },
    setActiveCategory: (state, { payload }) => {
      state.activeCategory = payload;
    },
    addCategoryAttribute: (state, { payload }) => {
      state.categoryAttributes.push(payload);
    },
    setCategoryAttribute: (state, { payload }) => {
      state.categoryAttributes = payload;
    },
    removeCategoryAttribute: (state, { payload }) => {
      if (payload?.id) {
        const deletedAttributeIndex = current(state.categoryAttributes).findIndex((attr) => attr.name === payload.name);
        state.categoryAttributes[deletedAttributeIndex] = { ...state.categoryAttributes[deletedAttributeIndex], status: 'deleted' };
      } else {
        state.categoryAttributes = current(state.categoryAttributes).filter((attr) => attr.name !== payload.name);
      }
    },
  },
  extraReducers: {
    // CREATE
    [createCategory.pending]: (state, action) => {
      state.createCategoryState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [createCategory.fulfilled]: (state, action) => {
      state.createCategoryState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [createCategory.rejected]: (state, action) => {
      state.createCategoryState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // GET
    [getCategories.pending]: (state, action) => {
      state.getCategoriesState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getCategories.fulfilled]: (state, action) => {
      state.getCategoriesState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getCategories.rejected]: (state, action) => {
      state.getCategoriesState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // UPDATE
    [updateCategory.pending]: (state, action) => {
      state.updateCategoryState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.updateCategoryState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [updateCategory.rejected]: (state, action) => {
      state.updateCategoryState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // DELETE
    [deleteCategory.pending]: (state, action) => {
      state.deleteCategoryState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.deleteCategoryState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [deleteCategory.rejected]: (state, action) => {
      state.deleteCategoryState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { categoryReset, setActiveCategory, addCategoryAttribute, removeCategoryAttribute, updateCategoryAttribute, setCategoryAttribute } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
