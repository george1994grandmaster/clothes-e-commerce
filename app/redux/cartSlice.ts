import { createSlice } from '@reduxjs/toolkit';
import { RootStore } from './store';
import { productsCount, CartItem } from '../types'; 


const initialState: productsCount = {
  totalCount: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    displayTotalCount: (state) => {
      const cartFromLocalStorageString = localStorage.getItem('cart');
      const cart = cartFromLocalStorageString ? JSON.parse(cartFromLocalStorageString) : null;
      state.totalCount = cart ? cart.reduce((total: number, item: CartItem) => total + item.quantity, 0) : 0;
    },
  },
});

export default cartSlice.reducer;
export const { displayTotalCount } = cartSlice.actions;
export const selectCart = (state: RootStore) => state.cart.totalCount;