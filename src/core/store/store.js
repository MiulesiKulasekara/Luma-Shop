import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../services/product/product";
import { userApi } from "../services/user/user";
import { setupListeners } from "@reduxjs/toolkit/query";
import { orderApi } from "../services/order/order";
import { productListingApi } from "../services/productListing/productListing";
import { vendorRatingApi } from "../services/vendorRatings/vendorRatings";
import spinnerReducer from "../services/spinner/spinner";
import spinnerMiddleware from "../services/spinner/spinnerMiddleware";
import { authApi } from "../services/auth/auth";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productListingApi.reducerPath]: productListingApi.reducer,
    [vendorRatingApi.reducerPath]: vendorRatingApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    spinner: spinnerReducer.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      productListingApi.middleware,
      vendorRatingApi.middleware,
      authApi.middleware,
      spinnerMiddleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
