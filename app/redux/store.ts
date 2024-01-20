import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './allDataSlice';
import productReducer from './productsSlice';
import cartReducer from './cartSlice';
import sidebarSlice from './sidebarSlice';
import categorieSlice from './categorieProductSlice';
import searchProductSlice from './searchProductSlice';
import actionSlice from './searchProductSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    product: productReducer,
    cart: cartReducer,
    sidebar: sidebarSlice,
    categorie: categorieSlice,
    search: searchProductSlice,
    action :actionSlice,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch