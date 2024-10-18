import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../helper/customBaseQuery";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: ({ userId }) => ({
        url: `/order/${userId}`,
        method: "GET",
      }),

      providesTags: ["Order"],
      transformResponse: (response) => response?.data,
    }),

    getAllOrder: builder.query({
      query: () => ({
        url: `/order`,
        method: "GET",
      }),

      providesTags: ["Order"],
      transformResponse: (response) => response?.data,
    }),

    updateOrder: builder.mutation({
      query: ({ productId, body }) => ({
        url: `/order/${productId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Order"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const { useGetUserOrdersQuery, useGetAllOrderQuery, useUpdateOrderMutation } = orderApi;
