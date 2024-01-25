import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootStore } from './store';

const initialState: any = {
  data: [],
  status: 'idle',
  error: null,
};

export const getData = createAsyncThunk('data/getData', async ({ param }: { param: string }) => {
 
  try {
    const response = await axios.get<any>(`/api/datas?category=${param}`);
    return response.data;
  } catch (error) {
    return Promise.reject(new Error('Failed to fetch products'));
  }
});

const dataSlice = createSlice({
  name: 'getAnyData',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
        
      })
      .addCase(getData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dataSlice.reducer;
export const Loading = (state: RootStore) => state.data.status;
export const getAllData = (state: RootStore) => state.data.data;