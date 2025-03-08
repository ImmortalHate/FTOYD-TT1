"use client";

import React, { useState } from 'react';
import './Header.styl';

type HeaderProps = {
  error?: string;
  loading?: boolean;
  onRefresh: () => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function Header({ error, loading, onRefresh, selectedFilter, onFilterChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Match Tracker</h1>
        <DropList selected={selectedFilter} onSelect={onFilterChange} />
        {error && (
          <div className="header__error-container">
            <div className="header__error-icon">
              <img src="header/alert-triangle.svg" alt="alert" className="header__error-vector" />
            </div>
            <span className="header__error-text">{error}</span>
          </div>
        )}
        <button
          className="header__refresh-button"
          onClick={onRefresh}
          disabled={loading}
        >
          <div className="header__refresh-content">
            <span className="header__refresh-text">Обновить</span>
            <img
              src="header/Refresh.svg"
              alt="loader"
              className={`header__loader ${loading ? 'rotating' : ''}`}
            />
          </div>
        </button>
      </div>
    </header>
  );
}

function DropList({ selected, onSelect }: { selected: string; onSelect: (option: string) => void }) {
  const options = ['Все статусы', 'Live', 'Finished', 'Match preparing'];
  const [opened, setOpened] = useState(false);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpened(prev => !prev);
  };

  const handleSelect = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(option);
    setOpened(false);
  };

  return (
    <button className="drop-list-button" onClick={toggleOpen}>
      <span className="drop-list-button__text">{selected}</span>
      <img
        src="/header/arrowdown2.svg"
        alt="arrow"
        className={`drop-list-button__arrow ${opened ? 'drop-list-button__arrow--rotated' : ''}`}
      />
      {opened && (
        <div className="drop-list-dropdown">
          {options.map(option => (
            <div
              key={option}
              className="drop-list-dropdown__item"
              onClick={(e) => handleSelect(option, e)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}
