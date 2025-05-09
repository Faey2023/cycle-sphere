import baseApi from '@/redux/api/baseApi';
import { User } from 'firebase/auth';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data?: User) => ({
        url: `/create-user`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
    getCurrentUser: builder.query<User, string>({
      query: (email) => `/users/${email}`,
    }),
  }),
});

export const { useAddUserMutation, useGetAllUsersQuery, useGetCurrentUserQuery } = userApi;
