"use client";

import React from 'react';
import './Header.styl';

type HeaderProps = {
  error?: string;
  loading?: boolean;
  onRefresh: () => void;
};

export default function Header({ error, loading, onRefresh }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Match Tracker</h1>
        <div className="header__action-container">
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
      </div>
    </header>
  );
}
