import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3139d02a38mshbd489b6dc765d35p1a6b9bjsn1e3b76a98845",
    "x-rapidapi-host": "shazam-core.p.rapidapi.com",
  },
};

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RAPIDAPI-Key",
        "3139d02a38mshbd489b6dc765d35p1a6b9bjsn1e3b76a98845"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/charts/world?country_code=IN",
    }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
