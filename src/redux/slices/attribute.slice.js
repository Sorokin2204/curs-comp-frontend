import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
export const createAttribute = createAsyncThunk('attribute/createAttribute', (attribute, { rejectWithValue }) => {
  console.log(attribute);
  return axios
    .post(`http://localhost:8080/api/attribute/create`, attribute)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const updateAttribute = createAsyncThunk('attribute/updateAttribute', (attribute, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/attribute/update`, attribute)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getAttributes = createAsyncThunk('attribute/getAttributes', (obj, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/attribute/list`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const getCategoryAttributes = createAsyncThunk('attribute/getCategoryAttributes', (categoryId, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/attribute/${categoryId}`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const getProductAttributes = createAsyncThunk('attribute/getProductAttributes', (productId, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/attribute?productId=${productId}`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
const attributeInitialState = {
  createAttributeState: {
    data: null,
    loading: false,
    error: null,
  },
  updateAttributeState: {
    data: null,
    loading: false,
    error: null,
  },
  getAttributesState: {
    data: null,
    loading: false,
    error: null,
  },
  getCategoryAttributes: {
    data: null,
    loading: false,
    error: null,
  },
  getProductAttributesState: {
    data: null,
    loading: false,
    error: null,
  },
};

const attributeSlice = createSlice({
  name: 'attribute',
  initialState: attributeInitialState,
  reducers: {
    attributeReset: (state, action) => {
      state.createAttributeState = attributeInitialState.createAttributeState;
      state.updateAttributeState = attributeInitialState.updateAttributeState;
      state.getAttributesState = attributeInitialState.getAttributesState;
      state.getCategoryAttributes = attributeInitialState.getCategoryAttributes;
    },
  },
  extraReducers: {
    // CREATE
    [createAttribute.pending]: (state, action) => {
      state.createAttributeState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [createAttribute.fulfilled]: (state, action) => {
      state.createAttributeState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [createAttribute.rejected]: (state, action) => {
      state.createAttributeState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // GET
    [getAttributes.pending]: (state, action) => {
      state.getAttributesState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getAttributes.fulfilled]: (state, action) => {
      state.getAttributesState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getAttributes.rejected]: (state, action) => {
      state.getAttributesState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // UPDATE
    [updateAttribute.pending]: (state, action) => {
      state.updateAttributeState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [updateAttribute.fulfilled]: (state, action) => {
      state.updateAttributeState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [updateAttribute.rejected]: (state, action) => {
      state.updateAttributeState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // UPDATE
    [getCategoryAttributes.pending]: (state, action) => {
      state.getCategoryAttributes = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getCategoryAttributes.fulfilled]: (state, action) => {
      const categoryAttributes = action.payload.map((attr) => {
        attr.attributeOptions = attr.attributeOptions.map((opt) => _.omit(opt, ['attributeId', 'createdAt', 'updatedAt']));
        return _.mapKeys(attr, (value, key) => (key === 'attributeOptions' ? 'options' : key));
      });
      state.getCategoryAttributes = {
        loading: false,
        data: categoryAttributes,

        error: null,
      };
    },
    [getCategoryAttributes.rejected]: (state, action) => {
      state.getCategoryAttributes = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // UPDATE
    [getProductAttributes.pending]: (state, action) => {
      state.getProductAttributesState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getProductAttributes.fulfilled]: (state, action) => {
      state.getProductAttributesState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getProductAttributes.rejected]: (state, action) => {
      state.getProductAttributesState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { attributeReset, setActiveAttribute, addAttributeAttribute, removeAttributeAttribute, updateAttributeAttribute } = attributeSlice.actions;
export const attributeReducer = attributeSlice.reducer;
