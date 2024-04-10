import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootStore } from './store';
import axios from 'axios';
import { DataItem, CategorieDataState } from '../types';


const initialState: CategorieDataState = {
  data: [],
  status: 'idle',
  error: null,
};

export const getProductByCategory = createAsyncThunk(
  'category/fetchByCategory',
  async ({ product, categorieQuery }: { product: string; categorieQuery: string }) => {
    console.log(categorieQuery)
    try {
      const response = await axios.get<DataItem[]>(`/api/datas?category=${product}&categorieQuery=${categorieQuery}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }
);

const categorieProductSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductByCategory.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getProductByCategory.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default categorieProductSlice.reducer;
export const selectCategorieİtems = (state: RootStore) => state.categorie.data;