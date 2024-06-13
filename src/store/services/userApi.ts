import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = {
  id_user?: string;
  name?: string;
  lastname?: string;
  password?: string;
  email?: string;
  isAdmin?: boolean;
  iat?: number;
  exp?: number;
  isSuitable?: boolean;
  isDisabled?: boolean;
};

export const userApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + '/api',
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => '/users'
    }),
    getUserById: builder.query<User, { id: string }>({
      query: ({ id }) => `/users/${id}`
    }),
    registerUser: builder.mutation<User, Partial<User>>({
      query: (newUserData) => {
        return {
          url: '/auth/AddUser',
          method: 'POST',
          body: newUserData
        };
      }
    }),
    loginUser: builder.mutation<User, Partial<User>>({
      query: (userLogin) => ({
        url: '/auth/LoginUser',
        method: 'POST',
        body: userLogin,
        credentials: 'include'
      })
    }),
    getProfile: builder.query<User, null>({
      query: () => '/auth/profile'
    }),
    updateIsSuitable: builder.mutation<User, Partial<User> & Pick<User, 'id_user'>>({
      query: ({ id_user, ...newUserData }) => ({
        url: `/users/lastSwornStatement/${id_user}`,
        method: 'PUT',
        body: newUserData
      })
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logoutUser',
        method: 'POST',
        invalidateTags: ['token']
      })
    })
  })
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useRegisterUserMutation,
  useGetProfileQuery,
  useUpdateIsSuitableMutation,
  useLogoutUserMutation,
  useLoginUserMutation
} = userApi;
