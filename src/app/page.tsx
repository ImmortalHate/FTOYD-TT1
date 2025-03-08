"use client";

import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { useFetchMatchesQuery } from '../store/api';
import MatchCards from '../components/matchCards/MatchCards';
import { Match } from '../store/api';

export default function HomePage() {
  const { data, error, isFetching, refetch } = useFetchMatchesQuery();
  const initialMatches = data?.data.matches || [];
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [filter, setFilter] = useState("Все статусы");

  // Синхронизация с данными из RTK Query при первой загрузке
  useEffect(() => {
    if (data?.data.matches) {
      setMatches(data.data.matches);
    }
  }, [data]);

  // Подключение к WebSocket для обновления данных в реальном времени
  useEffect(() => {
    console.log("Инициализация WebSocket-соединения...");
    const ws = new WebSocket("wss://app.ftoyd.com/fronttemp-service/ws");

    ws.onopen = () => {
      console.log("WebSocket подключен");
    };

    ws.onmessage = (event) => {
      console.log("Получено сообщение:", event.data);
      try {
        const parsedData = JSON.parse(event.data);

        // Если формат: { type: "update_matches", data: [ ... ] }
        if (parsedData.type === "update_matches" && Array.isArray(parsedData.data)) {
          console.log("Обновляем матчи из update_matches");
          setMatches(parsedData.data);
        }
        // Если формат соответствует Swagger: { ok: true, data: { matches: [...] } }
        else if (parsedData.ok && parsedData.data && parsedData.data.matches) {
          console.log("Обновляем матчи из MatchesResponse");
          setMatches(parsedData.data.matches);
        } 
        // Если данные приходят напрямую как массив матчей
        else if (Array.isArray(parsedData)) {
          console.log("Обновляем матчи из массива");
          setMatches(parsedData);
        } 
        else {
          console.warn("Неизвестный формат данных:", parsedData);
        }
      } catch (error) {
        console.error("Ошибка парсинга сообщения WebSocket:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket ошибка:", error);
    };

    ws.onclose = (event) => {
      console.warn("WebSocket соединение закрыто:", event);
    };

    return () => {
      console.log("Закрытие WebSocket-соединения");
      ws.close();
    };
  }, []);

  // Фильтрация матчей по выбранному статусу
  const filteredMatches = matches.filter(match => {
    if (filter === 'Все статусы') return true;
    if (filter === 'Live') return match.status === 'Ongoing';
    if (filter === 'Finished') return match.status === 'Finished';
    if (filter === 'Match preparing') return match.status === 'Scheduled';
    return true;
  });

  return (
    <main>
      <Header 
        error={error ? 'Ошибка при загрузке данных' : undefined}
        loading={isFetching}
        onRefresh={refetch}
        selectedFilter={filter}
        onFilterChange={setFilter}
      />
      <section className="matches-section">
        <div className="matches-container">
          <MatchCards matches={filteredMatches} />
        </div>
      </section>
    </main>
  );
}