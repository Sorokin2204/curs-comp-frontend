import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ProductCart.module.scss';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { currencyFormat } from '../../../utils/currencyFormat';
import { addToCart } from '../../../utils/addToCart';
import { deleteFromCart } from '../../../utils/deleteFromCart';
import { Image } from '@mui/icons-material';
const ProductCart = ({ id, image, name, price, onUpdateCart }) => {
  const [quantity, setQuantity] = useState();
  const [priceTotal, setPriceTotal] = useState(price);
  const [value, setValue] = useState();
  useEffect(() => {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    if (cartList) {
      const productFind = cartList.find((cartItem) => cartItem.id === id);
      if (productFind) setQuantity(productFind.quantity);
    }
  }, []);

  useEffect(() => {
    if (quantity) {
      addToCart(id, quantity, true);
      setPriceTotal(price * quantity);
    }
  }, [quantity]);

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '150px 1fr 220px 144px 30px',
          border: '1px solid grey',
          borderRadius: '5px',
          overflow: 'hidden',
          paddingRight: '15px',
          '& + &': {
            marginTop: '20px',
          },
        }}>
        {!image ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '150px',
            }}>
            <Image sx={{ fontSize: '40px', color: 'grey !important' }} />
          </div>
        ) : (
          <img
            style={{
              width: '100%',
              height: 'auto',
            }}
            src={'http://localhost:8080/' + image}
          />
        )}

        <Typography
          sx={{
            ml: '15px',
            mt: '5px',
            fontSize: '16px',
            fontWeight: '600',
          }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '20px',
          }}>
          <IconButton onClick={() => parseInt(quantity) !== 1 && setQuantity(parseInt(quantity) - 1)}>
            <Remove />
          </IconButton>
          <TextField
            value={quantity}
            type="number"
            onBlur={(e) => {
              if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 1 || e.target.value === '') {
                setQuantity(1);
              }
            }}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            autoComplete="off"
            sx={{
              '& input': { textAlign: 'center' },
              '& fieldset': { border: '1px solid rgba(0, 0, 0, 0.23)  !important' },
            }}
          />

          <IconButton onClick={() => setQuantity(parseInt(quantity) + 1)}>
            <Add />
          </IconButton>
        </Box>
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            alignSelf: 'center',

            fontSize: '20px',
            fontWeight: '600',
          }}>
          {currencyFormat(priceTotal) + ' руб'}
        </Typography>
        <IconButton
          onClick={() => {
            deleteFromCart(id);
            onUpdateCart();
            setValue({});
          }}
          sx={{
            alignSelf: 'center',
          }}>
          <Delete
            sx={{
              fontSize: '30px',
            }}
          />
        </IconButton>
      </Box>
    </>
  );
};

export default ProductCart;
