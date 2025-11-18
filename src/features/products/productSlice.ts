import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URLS, API_ENDPOINTS, CACHE_TIME } from "../BaseUrl";
import type { Product } from "../types";

export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Product'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URLS.FAKE_STORE,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => API_ENDPOINTS.PRODUCTS,
      providesTags: ['Product'],
      keepUnusedDataFor: CACHE_TIME.MEDIUM,
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;
