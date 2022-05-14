import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, productReset } from '../../redux/slices/product.slice';
import { Box, Button, Typography } from '@mui/material';
import ProductCart from '../components/ProductCart/ProductCart';
import { currencyFormat } from '../../utils/currencyFormat';
import { closeSuccessModal, openSuccessModal, openUserModal } from '../../redux/slices/user.slice';
import { createOrder, orderReset } from '../../redux/slices/order.slice';
import ModalSuccess from '../components/ModalSuccess/ModalSuccess';
import { useNavigate } from 'react-router';
import Loading from '../../admin/components/Loading/Loading';
import { SocketContext } from '../../socket';
const CartPage = () => {
  const socket = useContext(SocketContext);
  const [cartList, setCartList] = useState([]);

  const dispatch = useDispatch();
  const {
    checkAuthState: { data: authUser },

    successModal,
  } = useSelector((state) => state.user);
  const {
    createOrderState: { data: createOrderData, loading: createOrderLoading },
  } = useSelector((state) => state.order);

  const {
    getProductsState: { data: cartProducts, loading },
  } = useSelector((state) => state.product);

  const { cartQuantity } = useSelector((state) => state.cart);
  useEffect(() => {
    loadCartProducts();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(orderReset());
      dispatch(productReset());
    };
  }, []);

  const loadCartProducts = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    if (cart && cart?.length !== 0) {
      console.log(cart.map((cartItem) => cartItem.id));
      dispatch(getProducts({ include: cart.map((cartItem) => cartItem.id) }));
    }
  };

  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

  useEffect(() => {
    return () => {
      dispatch(productReset());
    };
  }, []);
  const naviage = useNavigate();
  useEffect(() => {
    if (createOrderData) {
      socket.emit('CREATE_ORDER');
      dispatch(openSuccessModal());
    }
  }, [createOrderData]);

  return (
    <>
      {!JSON.parse(localStorage.getItem('cart')) || !cartProducts || JSON.parse(localStorage.getItem('cart'))?.length === 0 || cartQuantity === 0 ? (
        <div
          style={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: '600',
            color: 'grey',
          }}>
          Корзина пуста
        </div>
      ) : (
        <>
          {' '}
          <div className="wrappe">
            <Typography variant="h4" sx={{ marginBottom: '30px', marginTop: '20px' }}>
              Корзина
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'calc(70% - 20px) 30%',
                gridGap: '20px',
              }}>
              <Box>{cartProducts && !loading && cartProducts?.map((cartProduct) => <ProductCart {...cartProduct} onUpdateCart={loadCartProducts} />)}</Box>
              <Box
                sx={{
                  padding: '15px 15px 40px 15px',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  borderRadius: '5px',
                  alignSelf: 'start',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>Итог</Typography>
                  <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>{currencyFormat(10000)}</Typography>
                </Box>
                {authUser ? (
                  <Button
                    onClick={() => {
                      dispatch(
                        createOrder({
                          userId: authUser.id,
                          products: JSON.parse(localStorage.getItem('cart')),
                        }),
                      );
                    }}
                    sx={{
                      marginTop: '20px',
                      width: '100%',
                    }}
                    size="large">
                    Оформить
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(openUserModal());
                    }}
                    sx={{
                      marginTop: '20px',
                      width: '100%',
                    }}
                    size="large"
                    disabled={authUser?.type === 'admin'}>
                    Оформить
                  </Button>
                )}
              </Box>
            </Box>
          </div>
          {successModal && (
            <ModalSuccess
              open={successModal}
              onClose={() => {
                localStorage.removeItem('cart');
                naviage('/orders');
                dispatch(closeSuccessModal());
              }}
            />
          )}
        </>
      )}
      {createOrderLoading && <Loading />}
    </>
  );
};

export default CartPage;
