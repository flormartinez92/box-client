import { Package } from '@/commons/interfaces/PackagesInterface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const packageApi = createApi({
  reducerPath: 'packageAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + '/api',
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getPackages: builder.query<Package[], null>({
      query: () => '/users/availablePackages'
    }),

    postPackage: builder.mutation<void, { packagesIds: any; userId: any }>({
      query: ({ packagesIds, userId }) => ({
        url: '/users/assignPackage',
        method: 'POST',
        body: { packagesIds, userId },
        credentials: 'include'
      })
    }),

    putCancelAssignedPackage: builder.mutation<Package, { packageId: any; userId: any }>({
      query: ({ packageId, userId }) => ({
        url: '/users/cancelAssignedPackage',
        method: 'PUT',
        body: { packageId, userId }
      })
    }),
    putPackageInCourse: builder.mutation<void, { packageId: any; userId: any }>({
      query: ({ packageId, userId }) => ({
        url: '/users/putPackageInCourse',
        method: 'PUT',
        body: { packageId, userId }
      })
    }),
    putPackageInDelivered: builder.mutation<void, { packageId: any; userId: any }>({
      query: ({ packageId, userId }) => ({
        url: '/users/putPackageInDelivered',
        method: 'PUT',
        body: { packageId, userId }
      })
    }),
    packagePendingAndInCourse: builder.query<Package[], { userId: string }>({
      query: ({ userId }) => ({
        url: `/users/packagePendingAndInCourse/${userId}`
      })
    }),
    packageInfo: builder.query<Package, { packageId: string }>({
      query: ({ packageId }) => ({
        url: `/users/packages/${packageId}`
      })
    }),
    userHistory: builder.query({
      query: ({ userId }) => ({
        url: `users/history/${userId}`
      })
    })
  })
});

export const {
  useGetPackagesQuery,
  usePostPackageMutation,
  usePutCancelAssignedPackageMutation,
  usePutPackageInDeliveredMutation,
  usePutPackageInCourseMutation,
  usePackagePendingAndInCourseQuery,
  usePackageInfoQuery,
  useUserHistoryQuery
} = packageApi;
