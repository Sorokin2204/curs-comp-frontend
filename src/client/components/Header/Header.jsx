import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Card, IconButton } from '@mui/material';
import { AccountBox, List, ShoppingCart } from '@mui/icons-material';
import Search from '../Search/Search';
import ModalLogin from '../ModalLogin/ModalLogin';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, openUserModal } from '../../../redux/slices/user.slice';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [commonQuantity, CommonQuantity] = useState(0);

  const {
    checkAuthState: { data: authData },
  } = useSelector((state) => state.user);

  const { cartQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    window.addEventListener('storage', () => console.log(localStorage.getItem('cart')));

    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    console.log(authData);
  }, [authData]);

  return (
    <>
      <header className={clsx(styles.header)}>
        <div className="container">
          <div className={clsx(styles.wrapper)}>
            <Link to="/">
              <img src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="" className={clsx(styles.logo)} />
            </Link>
            <Search />
            <IconButton className={clsx(styles.catalogBtn)} onClick={() => navigate('/category')}>
              <List />
            </IconButton>
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  transform: 'scale(1) translate(10%, -10%)',
                },
              }}
              badgeContent={cartQuantity}
              color="warning">
              <IconButton className={clsx(styles.cartBtn)} onClick={() => navigate('/cart')}>
                <ShoppingCart />
              </IconButton>
            </Badge>

            <IconButton
              className={clsx(styles.accountBtn)}
              onClick={() => {
                if (authData) {
                  if (authData.type === 'client') {
                    navigate('/orders');
                  } else if (authData.type === 'admin') {
                    navigate('/admin/orders');
                  }
                } else {
                  dispatch(openUserModal());
                }
              }}>
              {authData ? (
                <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column', alignItems: 'center' }}>
                  <AccountBox />
                  <div style={{ fontSize: '12px', marginTop: '1px', color: 'white' }}>{authData.login}</div>
                </div>
              ) : (
                <AccountBox />
              )}
            </IconButton>
          </div>
        </div>
      </header>
      <ModalLogin />
    </>
  );
};

export default Header;
