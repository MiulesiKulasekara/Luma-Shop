import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../helper/customBaseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getUserProducts: builder.query({
      query: ({ userId }) => ({
        url: `/product/${userId}`,
        method: "GET",
      }),

      providesTags: ["Product"],
      transformResponse: (response) => response?.data,
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: `/product`,
        method: "GET",
      }),

      providesTags: ["Product"],
      transformResponse: (response) => response?.data,
    }),

    createProduct: builder.mutation({
      query: ({ body }) => ({
        url: `/product`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Product"],
      transformResponse: (response) => response?.data,
    }),

    updateProduct: builder.mutation({
      query: ({ productId, body }) => ({
        url: `/product/${productId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Product"],
      transformResponse: (response) => response?.data,
    }),

    deleteProduct:builder.mutation({
      query: ({ productId }) => ({
        url: `/product/${productId}`,
        method: "DELETE",
      }),

      providesTags: ["Product"],
      transformResponse: (response) => response?.data,
    }),

    getProductsById: builder.query({
      query: ({ productId }) => ({
        url: `/product/${productId}`,
        method: "GET",
      }),

      transformResponse: (response) => response?.data,
  }),
  }),
});

export const {
  useGetUserProductsQuery,
  useGetAllProductsQuery,
  useGetProductsByIdQuery, 
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

