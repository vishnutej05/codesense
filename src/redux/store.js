import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './progressSlice';

export const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});
