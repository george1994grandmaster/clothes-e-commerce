import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './allDataSlice';
import productReducer from './productsSlice';
import cartReducer from './cartSlice';
import sidebarReducer from './sidebarSlice';
import categorieReducer from './categorieProductSlice';
import searchProductReducer from './searchProductSlice';
import actionReducer from './searchProductSlice';
import productsSliderReducer from './productsSliderSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    product: productReducer,
    cart: cartReducer,
    sidebar: sidebarReducer,
    categorie: categorieReducer,
    search: searchProductReducer,
    productAction: actionReducer,
    slider: productsSliderReducer,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch