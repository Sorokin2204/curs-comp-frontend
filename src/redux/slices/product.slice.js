import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const axios = require('axios');

export const getProducts = createAsyncThunk('product/playerListLoading', (productId) =>
  axios
    .get(`https://api.opendota.com/api/products/${productId}/players`)
    .then((response) => response.data)
    .catch((error) => error),
);

const productInitialState = {
  playerList: {
    status: 'idle',
    data: {},
    error: {},
  },
};

const productSlice = createSlice({
  name: 'user',
  initialState: productInitialState,
  reducers: {},
  extraReducers: {
    [fetchPlayerList.pending.type]: (state, action) => {
      state.playerList = {
        status: 'loading',
        data: {},
        error: {},
      };
    },
    [fetchPlayerList.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'idle',
        data: action.payload,
        error: {},
      };
    },
    [fetchPlayerList.rejected.type]: (state, action) => {
      state.playerList = {
        status: 'idle',
        data: {},
        error: action.payload,
      };
    },
  },
});

export default productSlice;
