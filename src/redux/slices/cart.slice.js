import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const getCommonQuantity = () => {
  const cartArr = JSON.parse(localStorage.getItem('cart'));
  if (!cartArr || cartArr?.length === 0) return 0;
  return _.sumBy(cartArr, (e) => e.quantity);
};
const cartInitialState = {
  cartQuantity: getCommonQuantity(),
};

console.log();

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    updateQuantity: (state, action) => {
      state.cartQuantity = getCommonQuantity();
    },
  },
});
export const { updateQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
