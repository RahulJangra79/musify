const clientId = "2da90d0faec14b62bdb4409dc5728a94";
const redirectUri = "https://musify-rahul-jangra.vercel.app/callback";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes.join(" "))}&show_dialog=true`;



// redux/services/spotify.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://your-backend-url.onrender.com/api', // your backend
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('spotify_access_token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopTracks: builder.query({
      query: () => 'top-tracks', // this route should call Spotify's /v1/me/top/tracks
    }),
  }),
});

export const { useGetTopTracksQuery } = spotifyApi;