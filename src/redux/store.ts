import { configureStore } from '@reduxjs/toolkit';

import bicycleReducer from './features/bicycle/bicycleSlice';
import { productApi } from './api/productApi';

export const store = configureStore({
  reducer: {
    bicycles: bicycleReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
  // middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
