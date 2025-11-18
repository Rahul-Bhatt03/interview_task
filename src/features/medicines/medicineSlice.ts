import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MedicineResponse, Medicine } from "../types";
import { API_BASE_URLS } from "../BaseUrl";

export const medicinesApi = createApi({
  reducerPath: "medicinesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URLS.MAAMS_API,
  }),
  tagTypes: ["Medicines"],

  endpoints: (builder) => ({
    getMedicines: builder.query<Medicine[], void>({
      query: () => "/medicines",
      transformResponse: (response: MedicineResponse) => response.data,
      providesTags: ["Medicines"],
    }),
  }),
});

export const {
  useGetMedicinesQuery,
} = medicinesApi;
