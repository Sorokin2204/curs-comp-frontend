import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const createOrder = createAsyncThunk('order/createOrder', (order, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/order/create`, order)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});
export const updateStatusOrder = createAsyncThunk('order/updateStatusOrder', (updateOrder, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/order/update-status`, updateOrder)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getOrders = createAsyncThunk('order/getOrders', (obj, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/order/list`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getOrderSingle = createAsyncThunk('order/getOrderSingle', (orderId, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/order/${orderId}`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getUserOrders = createAsyncThunk('order/getUserOrders', (userId, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/order/list/${userId}`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const orderInitialState = {
  createOrderState: {
    data: null,
    loading: false,
    error: null,
  },
  updateStatusOrderState: {
    data: null,
    loading: false,
    error: null,
  },
  getOrdersState: {
    data: null,
    loading: false,
    error: null,
  },
  getOrderSingleState: {
    data: null,
    loading: false,
    error: null,
  },
  getUserOrdersState: {
    data: null,
    loading: false,
    error: null,
  },
  activeOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,
  reducers: {
    orderReset: (state, action) => {
      state.createOrderState = orderInitialState.createOrderState;
      state.updateStatusOrderState = orderInitialState.updateStatusOrderState;
      state.getUserOrdersState = orderInitialState.getUserOrdersState;
      state.getUserOrdersState = orderInitialState.getOrderSingleState;
      state.activeOrder = null;
    },
    setActiveOrder: (state, { payload }) => {
      state.activeOrder = payload;
    },
  },
  extraReducers: {
    // CREATE
    [createOrder.pending]: (state, action) => {
      state.createOrderState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [createOrder.fulfilled]: (state, action) => {
      state.createOrderState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.orderModal = false;
    },
    [createOrder.rejected]: (state, action) => {
      state.createOrderState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // GET
    [getOrders.pending]: (state, action) => {
      state.getOrdersState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getOrders.fulfilled]: (state, action) => {
      state.getOrdersState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getOrders.rejected]: (state, action) => {
      state.getOrdersState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // UPDATE
    [updateStatusOrder.pending]: (state, action) => {
      state.updateStatusOrderState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [updateStatusOrder.fulfilled]: (state, action) => {
      state.updateStatusOrderState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.orderModal = false;
    },
    [updateStatusOrder.rejected]: (state, action) => {
      state.updateStatusOrderState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // GET SINGLE
    [getOrderSingle.pending]: (state, action) => {
      state.getOrderSingleState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getOrderSingle.fulfilled]: (state, action) => {
      state.getOrderSingleState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.orderModal = false;
    },
    [getOrderSingle.rejected]: (state, action) => {
      state.getOrderSingleState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // GET USER ORDERS
    [getUserOrders.pending]: (state, action) => {
      state.getUserOrdersState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getUserOrders.fulfilled]: (state, action) => {
      state.getUserOrdersState = {
        loading: false,
        data: action.payload,
        error: null,
      };
      state.orderModal = false;
    },
    [getUserOrders.rejected]: (state, action) => {
      state.getUserOrdersState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { orderReset, closeOrderModal, openOrderModal, setActiveOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
