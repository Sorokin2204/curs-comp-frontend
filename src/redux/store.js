import { configureStore } from '@reduxjs/toolkit';
import { attributeReducer } from './slices/attribute.slice';
import { brandReducer } from './slices/brand.slice';
import { categoryReducer } from './slices/category.slice';

export const store = configureStore({
  reducer: {
    brand: brandReducer,
    category: categoryReducer,
    attribute: attributeReducer,
  },
});
