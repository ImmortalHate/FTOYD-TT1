"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import './globals.styl';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}