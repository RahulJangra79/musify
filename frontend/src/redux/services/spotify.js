const clientId = "2da90d0faec14b62bdb4409dc5728a94";
const redirectUri = "https://musify-rahul-jangra.vercel.app/callback";
const scopes = [
  "user-read-recently-played",
  "user-top-read",
  "user-library-read",
  "playlist-read-private",
];

export const loginEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes.join(" "))}&show_dialog=true`;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://musify-vmr4.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("spotify_access_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopTracks: builder.query({
      query: () => "top-tracks",
    }),
    getRecentlyPlayed: builder.query({
      query: () => "recently-played",
    }),
    getSavedTracks: builder.query({
      query: () => "saved-tracks",
    }),
    getTopArtists: builder.query({
      query: () => "top-artists",
    }),
    getTrackDetails: builder.query({
      query: (id) => `tracks/${id}`,
    }),
    getRecommendations: builder.query({
      query: (id) => `recommendations?seed_tracks=${id}`,
    }),
    getArtistDetails: builder.query({
      query: (id) => `artists/${id}`,
    }),
    getArtistTopTracks: builder.query({
      query: (id) => `artists/${id}/top-tracks?market=IN`,
    }),
    searchTracks: builder.query({
      query: (term) =>
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          term
        )}&type=track&limit=20`,
    }),
  }),
});

export const {
  useGetTrackDetailsQuery,
  useGetRecommendationsQuery,
  useGetTopArtistsQuery,
  useGetRecentlyPlayedQuery,
  useGetSavedTracksQuery,
  useGetTopTracksQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopTracksQuery,
  useSearchTracksQuery,
} = spotifyApi;
