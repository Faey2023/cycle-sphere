import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from './api/baseApi';

import bicycleReducer from './features/bicycle/bicycleSlice';

export const store = configureStore({
  reducer: {
    bicycles: bicycleReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  // middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
