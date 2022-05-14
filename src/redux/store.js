import { configureStore } from '@reduxjs/toolkit';
import { attributeReducer } from './slices/attribute.slice';
import { brandReducer } from './slices/brand.slice';
import { cartReducer } from './slices/cart.slice';
import { categoryReducer } from './slices/category.slice';
import { orderReducer } from './slices/order.slice';
import { productReducer } from './slices/product.slice';
import { userReducer } from './slices/user.slice';

export const store = configureStore({
  reducer: {
    brand: brandReducer,
    category: categoryReducer,
    attribute: attributeReducer,
    product: productReducer,
    order: orderReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
