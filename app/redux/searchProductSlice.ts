import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from './store';
import { DataItem, DataState } from '../types';

const initialState: DataState = {
  products: [] || null, 
  status: 'idle',
  error: null,
  cart: [],
  productQuantity: []
};



export const getProductBySearch = createAsyncThunk(
  'letter/fetchProductByLetter',
  async ({ product, productQuery }: { product: string; productQuery: string }) => {
    try {
      const response = await axios.get<DataItem[]>(`/api/datas?category=${product}&productQuery=${productQuery}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProductBySearch.pending, (state) => {
      state.status = 'loading';
    })
    builder.addCase(getProductBySearch.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
      state.status = 'succeeded';
      state.products = action.payload
    })
    },
});

export default searchSlice.reducer;
export const selectLoading = (state: RootStore) => state.product.status;
export const selectProductByİd = (state: RootStore) => state.product.products;
export const selectProductCart = (state: RootStore) => state.product.cart;