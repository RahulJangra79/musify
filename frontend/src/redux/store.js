import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";

import { shazamCoreApi } from "./services/shazamCore";

import { spotifyApi } from "./services/spotify";

export const store = configureStore({
  reducer: {
    // [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    player: playerReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(shazamCoreApi.middleware),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});
