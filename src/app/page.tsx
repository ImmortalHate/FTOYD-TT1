"use client";

import React from 'react';
import Header from '../components/header/Header';
import { useFetchMatchesQuery } from '../store/api';
import MatchCards from '../components/matchCards/MatchCards';

export default function HomePage() {
  const { data, error, isFetching, refetch } = useFetchMatchesQuery();
  const matches = data?.data.matches || [];

  return (
    <main>
      <Header 
        error={error ? 'Ошибка при загрузке данных' : undefined}
        loading={isFetching}
        onRefresh={refetch}
      />
      <section className="matches-section">
        <div className="matches-container">
          <MatchCards matches={matches} />
        </div>
      </section>
    </main>
  );
}