import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getOrderSingle, getUserOrders, orderReset, setActiveOrder } from '../../redux/slices/order.slice';
import { typeOrder } from '../../admin/components/TableOrder/TableOrder';
import { OpenInBrowser, OpenInNew } from '@mui/icons-material';
import OrderInfo from '../components/OrderInfo/OrderInfo';
import { userReset } from '../../redux/slices/user.slice';
import { useNavigate } from 'react-router';
import { checkAuth } from '../../redux/slices/user.slice';
import { phoneFormat } from '../../utils/phoneFormat';
const OrdersPage = () => {
  const dispatch = useDispatch();
  const {
    getUserOrdersState: { data: userOrders },
    activeOrder,
    getOrderSingleState: { data: singleOrder },
  } = useSelector((state) => state.order);
  const {
    checkAuthState: { data: authUser, error: authError },
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (authUser) {
      dispatch(getUserOrders(authUser.id));
    }
  }, [, authUser]);

  useEffect(() => {
    if (activeOrder) {
      dispatch(getOrderSingle(activeOrder.id));
    }
  }, [activeOrder]);

  const navigate = useNavigate();

  const onClickExit = () => {
    localStorage.removeItem('token');
    dispatch(orderReset());
    dispatch(userReset());
    navigate('/');
  };

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (authUser) {
      if (authUser?.type === 'client') {
        setIsAuth(true);
      } else {
        navigate('/');
      }
    }
  }, [authUser]);
  useEffect(() => {
    if (authError) {
      navigate('/');
    }
  }, [authError]);

  return (
    <>
      {isAuth && (
        <>
          {' '}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}>
            <div>
              <Box
                sx={{
                  fontSize: '24px',
                }}>
                Добро пожаловать,
                <span
                  style={{
                    fontWeight: '600',
                  }}>
                  {authUser?.fullName}
                </span>
              </Box>
              <div
                style={{
                  color: 'grey',
                }}>
                {phoneFormat(authUser?.phone)}
              </div>
            </div>
            <Button color="error" onClick={() => onClickExit()} sx={{ mt: '20px' }}>
              Выйти
            </Button>
          </div>
          <Typography
            variant="h4"
            sx={{
              marginTop: '30px',
              marginBottom: '20px',
            }}>
            Все заказы
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridGap: '20px',
              gridTemplateColumns: 'auto 1fr',
            }}>
            {userOrders && userOrders?.length !== 0 ? (
              <Box>
                {userOrders?.map((userOrder) => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'start',
                      '& + &': {
                        marginTop: '20px',
                      },
                    }}
                    onClick={() => {
                      dispatch(setActiveOrder(userOrder));
                    }}>
                    <Box>
                      <Box
                        sx={{
                          fontWeight: '600',
                          ...(activeOrder?.id === userOrder?.id && { color: 'primary.main' }),
                        }}>{`Заказ №${userOrder.number}`}</Box>
                      <Box
                        sx={{
                          fontSize: '14px',
                          ...(userOrder.status === 'waiting' && { color: 'warning.main' }),
                          ...(userOrder.status === 'completed' && { color: 'success.main' }),
                          ...(userOrder.status === 'canceled' && { color: 'error.main' }),
                        }}>
                        {typeOrder(userOrder.status)}
                      </Box>
                    </Box>
                    <IconButton
                      sx={{
                        p: 0,
                        ml: 'auto',
                        pl: '4px',
                      }}>
                      <OpenInNew
                        sx={{
                          ...(activeOrder?.id === userOrder?.id && { color: 'primary.main' }),
                        }}
                      />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            ) : (
              <div
                style={{
                  height: '50vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '600',
                  color: 'grey',
                  gridColumn: '1/3',
                }}>
                Заказов нет
              </div>
            )}

            <Box>
              <OrderInfo />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default OrdersPage;
