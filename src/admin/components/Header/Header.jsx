import React from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { Button, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();

  return (
    <header className={clsx(styles.header)}>
      <div className=""></div>
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
      <IconButton className={clsx(styles.logout)}>
        <Logout />
      </IconButton>
    </header>
  );
};

export default Header;
