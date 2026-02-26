import React from 'react';
import Header from './Header.jsx';

const AppShell = ({ children }) => {
  return (
    <div className="app-root">
      <Header />
      <main className="app-main">{children}</main>
    </div>
  );
};

export default AppShell;

