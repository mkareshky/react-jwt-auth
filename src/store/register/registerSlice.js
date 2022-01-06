import { createSlice } from '@reduxjs/toolkit';
import { TYPE_REGISTER } from './types';

const initialState = {
  data: null,
  isLoading: false,
  error: null
}

export const vendorCreateSlice = createSlice({
  name: TYPE_REGISTER,
  initialState,
  reducers: {
    request: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    reset: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
    success: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    error: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  },
})

export default vendorCreateSlice.reducer;
