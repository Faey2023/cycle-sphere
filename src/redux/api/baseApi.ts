import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
    // baseUrl: 'https://bicycle-pedal-paradise.vercel.app/api',
    credentials: 'include',
  }),
  tagTypes: ['Bicycle'],
  endpoints: () => ({}),
});
export default baseApi;
