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

interface SliderItems  {
  products: DataItem[];
  slideIndex: number;
}

const initialState: SliderItems = {
  products: [] || null,
  slideIndex: 0
};

export const getSliderProducts = createAsyncThunk('sliderData/getSliderProducts', async ({ sliderItems, productCategory }: { sliderItems: string, productCategory?: string }) => {
  try {
    const response = await axios.get<any>(`/api/datas?category=${sliderItems}${productCategory ? `&productCategory=${productCategory}` : ''}`);
    return response.data;
  } catch (error) {
    return Promise.reject(new Error('Failed to fetch products'));
  }
});

const productSliderSlice = createSlice({
  name: 'productSlider',
  initialState,
  reducers: {
    changeSlideIndex: (state, action: PayloadAction<number>) => {
      state.slideIndex = action.payload;
    }, 
  },
  extraReducers: (builder) => {
    builder
     .addCase(getSliderProducts.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.products = action.payload
      })
    },
});

export default productSliderSlice.reducer;
export const { changeSlideIndex } = productSliderSlice.actions;
export const getProductsSliderItems = (state: RootStore) => state.slider.products;
export const getCurrentIndex = (state: RootStore) => state.slider.slideIndex;

