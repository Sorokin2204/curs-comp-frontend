import React from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { Button, IconButton } from '@mui/material';
import { Logout, Web } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { userReset } from '../../../redux/slices/user.slice';
import { useDispatch } from 'react-redux';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <header className={clsx(styles.header)}>
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Web />
        <div
          style={{
            fontSize: '12px',
          }}>
          На главную
        </div>
      </IconButton>
      <ul className={clsx(styles.menu)}>
        <li className={clsx(styles.menuItem)}>
          <Link to="/admin/products" className={clsx(styles.menuLink, location.pathname === '/admin/products' && styles.menuLinkActive)}>
            Товары
          </Link>
        </li>
        <li className={clsx(styles.menuItem)}>
          <Link to="/admin/orders" className={clsx(styles.menuLink, location.pathname === '/admin/orders' && styles.menuLinkActive)}>
            Заказы
          </Link>
        </li>
        <li className={clsx(styles.menuItem)}>
          <Link to="/admin/brands" className={clsx(styles.menuLink, location.pathname === '/admin/brands' && styles.menuLinkActive)}>
            Бренды
          </Link>
        </li>
        <li className={clsx(styles.menuItem)}>
          <Link to="/admin/categories" className={clsx(styles.menuLink, location.pathname === '/admin/categories' && styles.menuLinkActive)}>
            Категории
          </Link>
        </li>
      </ul>
      <IconButton
        onClick={() => {
          localStorage.removeItem('token');
          dispatch(userReset());
          navigate('/');
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Logout />
        <div
          style={{
            fontSize: '12px',
          }}>
          Выход
        </div>
      </IconButton>
    </header>
  );
};

export default Header;
