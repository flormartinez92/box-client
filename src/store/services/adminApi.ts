import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type PackageStructure = {
  address: string;
  city: string;
  deadLine: string | Date; // O podrías usar tipo Date si prefieres
  receptorName: string;
  weight: number;
  postalCode: number;
  addressNumber: number;
};

export const adminApi = createApi({
  reducerPath: 'adminAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + '/api/admin',
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    postAddPackage: builder.mutation<void, PackageStructure>({
      query: (body) => {
        return {
          url: 'addPackage',
          method: 'POST',
          body: body
        };
      }
    }),
    getDeliveryDetails: builder.query<any, any>({
      query: (date) => {
        return {
          url: `deliveryDetails/${date}`,
          method: 'GET'
        };
      }
    }),
    getDeliveryUsers: builder.query<any, any>({
      query: () => {
        return {
          url: 'getDeliveryUsers',
          method: 'GET'
        };
      }
    }),
    toggleHiddenHistoryAdmin: builder.mutation<void, string>({
      query: (id) => {
        return {
          url: `toggleHiddenHistoryAdmin/${id}`,
          method: 'PUT'
        };
      }
    }),
    patchUpdateUserStatus: builder.mutation({
      query: ({ id, isDisabled }) => {
        return {
          url: `updateUserStatus/${id}`,
          method: 'PATCH',
          body: { isDisabled }
        };
      }
    }),
    getUsers: builder.query<any, any>({
      query: () => {
        return {
          url: 'users',
          method: 'GET'
        };
      }
    })
  })
});

export const {
  usePostAddPackageMutation,
  useGetDeliveryDetailsQuery,
  useGetDeliveryUsersQuery,
  useToggleHiddenHistoryAdminMutation,
  usePatchUpdateUserStatusMutation,
  useGetUsersQuery
} = adminApi;
