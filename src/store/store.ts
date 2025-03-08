import { configureStore } from '@reduxjs/toolkit';
import { matchesApi } from './api';

export const store = configureStore({
  reducer: {
    [matchesApi.reducerPath]: matchesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(matchesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 