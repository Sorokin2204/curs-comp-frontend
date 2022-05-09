import React from 'react';
import clsx from 'clsx';
import Header from './components/Header/Header';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
const Wrapper = ({ children }) => {
  return (
    <>
      <main
        style={{
          height: '100vh',
        }}>
        <ThemeProvider theme={theme}>
          <Header />
          {children}
        </ThemeProvider>
      </main>
    </>
  );
};

export default Wrapper;
