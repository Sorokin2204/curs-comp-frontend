import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Header from './components/Header/Header';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { checkAuth } from '../redux/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const Wrapper = ({ children }) => {
  const {
    checkAuthState: { data: authData, loading: authLoading, error: authError },
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (authData) {
      if (authData?.type === 'admin') {
        setIsAuth(true);
      } else {
        navigate('/');
      }
    }
  }, [authData]);
  useEffect(() => {
    if (authError) {
      navigate('/');
    }
  }, [authError]);

  return (
    <>
      {isAuth && (
        <main
          style={{
            height: '100vh',
          }}>
          <ThemeProvider theme={theme}>
            <div className="container">
              <Header />
              {children}
            </div>
          </ThemeProvider>
        </main>
      )}
    </>
  );
};

export default Wrapper;
