import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootStore } from './store';
import { DataItem, ProductDataState } from '../types';

const initialState: ProductDataState = {
  products: [] || null,
  selectedProducts: [] || null, 
  status: 'idle',
  error: null,
  cart: [],
  productQuantity: null,
};

export const getProducts = createAsyncThunk('products/getProducts', async ({ products, productCategory, dataCount }: { products: string; productCategory?: string; dataCount?: number }) => {
  try {
    const response = await axios.get<any>(`/api/datas?category=${products}${dataCount ? `&dataCount=${dataCount}` : ''}${productCategory ? `&productCategory=${productCategory}` : ''}`);
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

    addProduct: (state, action: PayloadAction<DataItem>) => {
      const currentProduct = { ...action.payload };
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
      const existingProduct = cartFromLocalStorage.find((item: DataItem) => item.id === currentProduct.id);
      if (existingProduct) {
        existingProduct.quantity ++;
        const formattedPrice = parseFloat(existingProduct.price.replace(/[^0-9,.]+/g, '').replace(',', '.'));
        const updatedPrice = formattedPrice / currentProduct.quantity * existingProduct.quantity;
        const updatedPriceString = updatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        const updatedPriceStringWithComma = updatedPriceString.replace('.', ',');
        existingProduct.price = updatedPriceStringWithComma;
        localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
      }
    },

    decreaseProduct: (state, action: PayloadAction<DataItem>) => {
      const currentProduct = { ...action.payload };
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
      const existingProduct = cartFromLocalStorage.find((item: DataItem) => item.id === currentProduct.id);
      if (existingProduct) {
        existingProduct.quantity --;
        const formattedPrice = parseFloat(existingProduct.price.replace(/[^0-9,.]+/g, '').replace(',', '.'));
        const updatedPrice = formattedPrice / currentProduct.quantity * existingProduct.quantity;
        const updatedPriceString = updatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        const updatedPriceStringWithComma = updatedPriceString.replace('.', ',');
        existingProduct.price = updatedPriceStringWithComma;
        localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
      }
    },

    addToBasket: (state, action: PayloadAction<DataItem>) => {
      const currentProduct = { ...action.payload };
      const formattedPrice = parseFloat(currentProduct.price.replace(/[^0-9,.]+/g, '').replace(',', '.'));
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]') as DataItem[];
      const existingProduct = cartFromLocalStorage.find((item: DataItem) => item.id === currentProduct.id);
      if (!existingProduct) {
        const updatedPrice = formattedPrice * currentProduct.quantity;
        const updatedPriceString = updatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        const updatedPriceStringWithComma = updatedPriceString.replace('.', ',');
        currentProduct.price = updatedPriceStringWithComma
        localStorage.setItem('cart', JSON.stringify([currentProduct, ...cartFromLocalStorage ]));
      }else {
        existingProduct.quantity += currentProduct.quantity;
        const updatedPrice = formattedPrice * existingProduct.quantity;
        const updatedPriceString = updatedPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        const updatedPriceStringWithComma = updatedPriceString.replace('.', ',');
        existingProduct.price = updatedPriceStringWithComma;
        localStorage.setItem('cart', JSON.stringify(cartFromLocalStorage));
      }
    },

    productsCount: (state) => {
      const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
      state.productQuantity = cartFromLocalStorage.length;
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
export const { addQuantity, decreaseQuantity, addToBasket, addProduct, decreaseProduct, productsCount } = productSlice.actions;
export const loading = (state: RootStore) => state.product.status;
export const getProductItems = (state: RootStore) => state.product.products;
export const getSelectedProduct = (state: RootStore) => state.product.selectedProducts;
export const getProductsQuantity = (state: RootStore) => state.product.productQuantity;
export const getProductCart = (state: RootStore) => state.product.cart;