import { configureStore } from '@reduxjs/toolkit';
import baseApi from './api/baseApi';
import bicycleReducer from './features/bicycle/bicycleSlice';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bicycles: bicycleReducer,
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
