import React from 'react';
import clsx from 'clsx';
import Header from './components/Header/Header';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
const WrapperStore = ({ children }) => {
  return (
    <>
      <main
        style={{
          height: '100vh',
        }}>
        <ThemeProvider theme={theme}>
          <Header />
          <div className="container">{children}</div>
        </ThemeProvider>
      </main>
    </>
  );
};

export default WrapperStore;
