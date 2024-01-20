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

export const getProducts = createAsyncThunk('dat/get', async ({ products, dataCount }: { products: string; dataCount?: number }) => {
  try {
    const response = await axios.get<any>(`/api/datas?category=${products}${dataCount ? `&dataCount=${dataCount}` : ''}`);
    return response.data;
  } catch (error) {
    return Promise.reject(new Error('Failed to fetch products'));
  }
});

export const getProductByİd = createAsyncThunk(
  'productByİd/getProductByİd',
  async ({ product, productİd }: { product: string; productİd: string }) => {
    try {
      const response = await axios.get<DataItem>(`/api/datas?category=${product}&productİd=${productİd}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productToUpdate = state.selectedProducts.find((item) => item.id === productId);
      if (productToUpdate) {
        state.selectedProducts = state.selectedProducts.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    },
    decreaseFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productToUpdate = state.selectedProducts.find((item) => item.id === productId);
      if (productToUpdate) {
        state.selectedProducts = state.selectedProducts.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    },
    addToBasket: (state, action: PayloadAction<DataItem>) => {
      const currentProduct = { ...action.payload };
      const formattedPrice = parseFloat(currentProduct.price.replace(/[^0-9,.]+/g, '').replace(',', '.'));
      const cartFromLocalStorageString = localStorage.getItem('cart');
      const cartFromLocalStorage = cartFromLocalStorageString ? JSON.parse(cartFromLocalStorageString) as DataItem[] : [];
      const existingProduct = cartFromLocalStorage.find((item: DataItem) => item.id === currentProduct.id);
    
      if (!existingProduct) {
        const updatedPrice = formattedPrice * currentProduct.quantity;
        const updatedPriceString = updatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        const updatedPriceStringWithComma = updatedPriceString.replace('.', ',');
        currentProduct.price = updatedPriceStringWithComma
        localStorage.setItem('cart', JSON.stringify([...cartFromLocalStorage, currentProduct]));
      }else {
        existingProduct.quantity += currentProduct.quantity;
        const updatedPrice = formattedPrice * existingProduct.quantity;
        const updatedPriceString = updatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        const updatedPriceStringWithComma = updatedPriceString.replace('.', ',');
        existingProduct.price = updatedPriceStringWithComma;
        localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductByİd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductByİd.fulfilled, (state, action: PayloadAction<DataItem>) => {
        state.status = 'succeeded';
        const currentProduct = { ...action.payload }; 
        const existingProduct = state.selectedProducts.find(item => item.id === currentProduct.id);
        if (!existingProduct) {
          state.selectedProducts = [...state.selectedProducts, { ...currentProduct, quantity: 1 }];
        }
        state.error = null;
      })
      .addCase(getProductByİd.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.products = action.payload
      })
    },
});

export default productSlice.reducer;
export const { addToCart, decreaseFromCart, addToBasket } = productSlice.actions;
export const loading = (state: RootStore) => state.product.status;
export const getProductİtems = (state: RootStore) => state.product.products;
export const getSelectedProduct = (state: RootStore) => state.product.selectedProducts;
export const getProductCart = (state: RootStore) => state.product.cart;