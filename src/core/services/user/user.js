import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../helper/customBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ body }) => ({
        url: `/register`,
        method: "POST",
        body: body,
      }),

      transformResponse: (response) => response?.data,
    }),

    getUserById: builder.query({
      query: ({ userId }) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),

      transformResponse: (response) => response?.data,
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),

      providesTags: ["User"],
      transformResponse: (response) => response?.data,
    }),

    updateUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => response,
    }),

    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
