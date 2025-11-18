import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URLS, API_ENDPOINTS, CACHE_TIME } from '../BaseUrl';
import type { User } from '../types';

export const usersApiSlice = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URLS.JSON_PLACEHOLDER,
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => API_ENDPOINTS.USERS,
            providesTags: ['User'],
            keepUnusedDataFor: CACHE_TIME.MEDIUM,
        }),
    }),
});

export const {
    useGetUsersQuery,
} = usersApiSlice;