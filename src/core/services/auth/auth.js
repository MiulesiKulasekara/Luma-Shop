import { BASE_URL } from "../../../constant/constant";

// export const authService = async (requestBody) => {
//   const loginUrl = `${BASE_URL}login`;
//   try {
//     const response = await fetch(loginUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ body }) => ({
        url: `/login`,
        method: "POST",
        body: body,
      }),

      transformResponse: (response) => response,
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
