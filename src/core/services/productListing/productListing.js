import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../helper/customBaseQuery";

export const productListingApi = createApi({
  reducerPath: "productListingApi",
  baseQuery: customBaseQuery,
  tagTypes: ["ProductListing"],
  endpoints: (builder) => ({
    getUserProductListings: builder.query({
      query: ({ userId }) => ({
        url: `/productListing/${userId}`,
        method: "GET",
      }),

      providesTags: ["ProductListing"],
      transformResponse: (response) => response?.data,
    }),

    getAllProductListings: builder.query({
      query: () => ({
        url: `/productListing`,
        method: "GET",
      }),

      providesTags: ["ProductListing"],
      transformResponse: (response) => response?.data,
    }),

    createProductListing: builder.mutation({
      query: ({ body }) => ({
        url: `/productListing`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ProductListing"],
      transformResponse: (response) => response?.data,
    }),

    updateProductListing: builder.mutation({
      query: ({ productListingId, body }) => ({
        url: `/productListing/${productListingId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["ProductListing"],
      transformResponse: (response) => response?.data,
    }),

    deleteProductListing: builder.mutation({
      query: ({ productListingId }) => ({
        url: `/productListing/${productListingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductListing"],
      transformResponse: (response) => response?.data,
    }),

    getProductListingById: builder.query({
      query: ({ productListingId }) => ({
        url: `/productListing/${productListingId}`,
        method: "GET",
      }),

      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetUserProductListingsQuery,
  useGetAllProductListingsQuery,
  useGetProductListingByIdQuery,
  useUpdateProductListingMutation,
  useCreateProductListingMutation,
  useDeleteProductListingMutation,
} = productListingApi;
