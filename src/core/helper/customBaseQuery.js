import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
import { BASE_URL } from "../../constant/constant";

// Create the baseQuery outside to avoid recreating it on every call
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers) => {
    try {
      const session = await getCurrentSession();
      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }
    } catch (error) {
      console.error("Error fetching session: ", error);
      // Handle the error appropriately here if necessary
    }
    return headers;
  },
});

// Custom base query handler
const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Add any custom error handling or side effects here if needed
  return result;
};

// Function to get the current session's access token from cookies
const getCurrentSession = async () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("AUTH_TOKEN_KEY");

  if (accessToken) {
    return { accessToken };
  }

  // Handle session not found, you may want to redirect or refresh token here
  throw new Error("No valid session found");
};

export default customBaseQuery;
