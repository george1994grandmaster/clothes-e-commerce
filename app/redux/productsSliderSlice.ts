import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from './store';


interface DataItem {
  id: number;
  title: string;
  src: string;
  quantity: number;
  category: string;
  price: string;
}

interface DataState {
  products: DataItem[];
  selectedProducts: DataItem[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  cart: DataItem[],
  productQuantity: DataItem[],
}

const initialState: DataState = {
  products: [] || null,
  selectedProducts: [] || null, 
  status: 'idle',
  error: null,
  cart: [],
  productQuantity: []
};

export const getSliderProducts = createAsyncThunk('sliderData/getSliderProducts', async ({ products }: { products: string }) => {
  try {
    const response = await axios.get<any>(`/api/datas?category=${products}`);
    return response.data;
  } catch (error) {
    return Promise.reject(new Error('Failed to fetch products'));
  }
});

const productSliderSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
     .addCase(getSliderProducts.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.products = action.payload
      })
    },
});

export default productSliderSlice.reducer;
export const loading = (state: RootStore) => state.slider.status;
export const getProductİtems = (state: RootStore) => state.slider.products;

