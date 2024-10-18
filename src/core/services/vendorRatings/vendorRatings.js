import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../helper/customBaseQuery";

export const vendorRatingApi = createApi({
  reducerPath: "vendorRatingApi",
  baseQuery: customBaseQuery,
  tagTypes: ["VendorRating"],
  endpoints: (builder) => ({
    getVendorRatings: builder.query({
      query: ({ userId }) => ({
        url: `/ratings/${userId}`,
        method: "GET",
      }),

      providesTags: ["VendorRating"],
      transformResponse: (response) => response?.data,
    }),

    getAllVendorRatings: builder.query({
      query: () => ({
        url: `/ratings`,
        method: "GET",
      }),

      providesTags: ["VendorRating"],
      transformResponse: (response) => response?.data,
    }),

    deleteVendorRating: builder.mutation({
      query: ({ productListingId }) => ({
        url: `/ratings/${productListingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VendorRating"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetVendorRatingsQuery,
  useGetAllVendorRatingsQuery,
  useDeleteVendorRatingMutation,
} = vendorRatingApi;
