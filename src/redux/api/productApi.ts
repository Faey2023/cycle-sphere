import { GetAllBicyclesParams } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/products',
  }),
  endpoints: (builder) => ({
    getAllBicycle: builder.query({
      query: (params: GetAllBicyclesParams | string = {}) => {
        // if searching true,
        if (typeof params === 'string') {
          return params ? `?searchTerm=${params}` : '/';
        }

        // building query string from params object when multiple query exist
        const queryParams = new URLSearchParams();

        if (params.searchTerm) {
          queryParams.append('searchTerm', params.searchTerm);
        }
        if (params.brand) {
          queryParams.append('brand', params.brand);
        }
        if (params.category) {
          queryParams.append('category', params.category);
        }
        if (params.model) {
          queryParams.append('model', params.model);
        }
        if (params.minPrice !== undefined) {
          queryParams.append('minPrice', params.minPrice.toString());
        }
        if (params.maxPrice !== undefined) {
          queryParams.append('maxPrice', params.maxPrice.toString());
        }
        if (params.inStock !== undefined) {
          queryParams.append('inStock', params.inStock.toString());
        }

        const queryString = queryParams.toString();
        return queryString ? `?${queryString}` : '/';
      },
    }),
    getSingleBicycle: builder.query({
      query: (productId?: string | undefined) => `/${productId}`,
    }),
    addBicycle: builder.mutation({
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateBicycle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteBicycle: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllBicycleQuery, useGetSingleBicycleQuery } = productApi;

// web API
//https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
/**
 *
 */

// traditional
/**
let url = '?';

if (params?.searchTerm) url += `searchTerm=${params.searchTerm}&`;
if (params?.brand) url += `brand=${params.brand}&`;
if (params?.category) url += `category=${params.category}&`;
if (params?.model) url += `model=${params.model}&`;
if (params?.minPrice) url += `minPrice=${params.minPrice}&`;
if (params?.maxPrice) url += `maxPrice=${params.maxPrice}&`;
if (params?.inStock !== undefined) url += `inStock=${params.inStock}&`;

// Remove last '&' if it exists
if (url.endsWith('&')) {
  url = url.slice(0, -1);
}

return url === '?' ? '/' : url;
 */
