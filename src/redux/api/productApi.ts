import { Bicycle, GetAllBicyclesParams } from '@/types';
import baseApi from './baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBicycle: builder.query({
      query: (params: GetAllBicyclesParams | string = {}) => {
        // if searching true,
        if (typeof params === 'string') {
          return params ? `/products?searchTerm=${params}` : '/products';
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
        return queryString ? `/products?${queryString}` : '/products';
      },
      providesTags: ['Bicycle'],
    }),
    getSingleBicycle: builder.query({
      query: (productId?: string | undefined) => `/products/${productId}`,
    }),
    addBicycle: builder.mutation({
      query: (data?: Bicycle) => ({
        url: `/products/create-Bicycle`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Bicycle'],
    }),
    updateBicycle: builder.mutation({
      query: ({ id, data }: { id: string; data: Bicycle }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Bicycle'],
    }),
    deleteBicycle: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bicycle'],
    }),
  }),
});

export const {
  useGetAllBicycleQuery,
  useGetSingleBicycleQuery,
  useAddBicycleMutation,
  useUpdateBicycleMutation,
  useDeleteBicycleMutation,
} = productApi;

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
