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

export const getProducts = createAsyncThunk('products/getProducts', async ({ products, dataCount }: { products: string; dataCount?: number }) => {
  try {
    const response = await axios.get<any>(`/api/datas?category=${products}${dataCount ? `&dataCount=${dataCount}` : ''}`);
    return response.data;
  } catch (error) {
    return Promise.reject(new Error('Failed to fetch products'));
  }
});

export const getProductById = createAsyncThunk(
  'productByİd/getProductById',
  async ({ products, productId }: { products: string; productId: string }) => {
    try {
      const response = await axios.get<DataItem>(`/api/datas?category=${products}&productId=${productId}`);
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
    addQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productExist = state.selectedProducts.find((item) => item.id === productId);
      if (productExist) {
        state.selectedProducts = state.selectedProducts.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productExist = state.selectedProducts.find((item) => item.id === productId);
      if (productExist) {
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
      console.log(existingProduct)
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
      .addCase(getProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<DataItem>) => {
        state.status = 'succeeded';
        const currentProduct = { ...action.payload }; 
        const existingProduct = state.selectedProducts.find(item => item.id === currentProduct.id);
        if (!existingProduct) {
          state.selectedProducts = [...state.selectedProducts, { ...currentProduct, quantity: 1 }];
        }
        state.error = null;
      })
      .addCase(getProductById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.products = action.payload
      })
    },
});

export default productSlice.reducer;
export const { addQuantity, decreaseQuantity, addToBasket } = productSlice.actions;
export const loading = (state: RootStore) => state.product.status;
export const getProductItems = (state: RootStore) => state.product.products;
export const getSelectedProduct = (state: RootStore) => state.product.selectedProducts;
export const getProductCart = (state: RootStore) => state.product.cart;