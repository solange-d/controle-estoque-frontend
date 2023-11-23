
import React from 'react';
import MainMenuBar from './MainMenuBar';

function Layout({ children }) {
  return (
    <div>
      <MainMenuBar />
      <div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
