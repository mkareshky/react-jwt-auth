import { createSlice } from '@reduxjs/toolkit';
import { TYPE_LOGIN } from './types';

const initialState = {
  data: null,
  isLoading: false,
  error: null
}

export const loginSlice = createSlice({
  name: TYPE_LOGIN,
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

export default loginSlice.reducer;