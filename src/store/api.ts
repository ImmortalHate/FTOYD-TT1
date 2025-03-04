import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Player {
  username: string;
  kills: number;
}

export interface Team {
  name: string;
  players: Player[];
  points: number;
  place: number;
  total_kills: number;
}

export type MatchStatus = 'Scheduled' | 'Ongoing' | 'Finished';

export interface Match {
  time: string;
  title: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
}

export interface MatchesResponse {
  ok: boolean;
  data: {
    matches: Match[];
  };
}

export const matchesApi = createApi({
  reducerPath: 'matchesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://app.ftoyd.com/fronttemp-service/' }),
  endpoints: (builder) => ({
    fetchMatches: builder.query<MatchesResponse, void>({
      query: () => 'fronttemp',
    }),
  }),
});

export const { useFetchMatchesQuery } = matchesApi;

//https://app.ftoyd.com/fronttemp-service/