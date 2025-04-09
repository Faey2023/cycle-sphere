import baseApi from '@/redux/api/baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: `/orders`,
        method: 'GET',
      }),
    }),
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation, useGetAllOrderQuery } = orderApi;
export default orderApi;
