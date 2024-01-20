import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootStore } from './store';
import axios from 'axios';
import { DataItem, Sidebar } from '../types'; 

const initialState: Sidebar = {
  data: [] as any,
  status: 'idle',
  error: null,
};

export const getSidebarİtems = createAsyncThunk(
  'sidebar/fetchSidebarİtems',
  async ({ sidebarİtems }: { sidebarİtems: string }) => {
    try {
      const response = await axios.get<DataItem[]>(`/api/datas?category=${sidebarİtems}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch product');
    }
  }
);

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSidebarİtems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSidebarİtems.fulfilled, (state, action: PayloadAction<DataItem[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getSidebarİtems.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default sidebarSlice.reducer;
export const selectSidebarDatas = (state: RootStore) => state.sidebar.data;