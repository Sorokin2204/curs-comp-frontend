import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Product.module.scss';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { isProductInCart } from '../../../utils/isProductInCart';
import { currencyFormat } from '../../../utils/currencyFormat';
import { addToCart } from '../../../utils/addToCart';
import { Image } from '@mui/icons-material';
import { Box } from '@mui/material';
const Product = ({ id, name, image, price }) => {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(isProductInCart(id));
  }, []);

  const navigate = useNavigate();

  return (
    <Card sx={{ boxShadow: 3, display: 'flex', flexDirection: 'column' }}>
      {image ? (
        <CardMedia sx={{}} component="img" height="200" image={`http://localhost:8080/${image}`} alt="green iguana" />
      ) : (
        <Box sx={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { fontSize: '50px', color: 'grey !important' } }}>
          <Image />
        </Box>
      )}

      <CardContent>
        <Link
          to={`/product/${id}`}
          style={{
            color: '#000',
            textDecoration: 'none',
            fontSize: '16px',
          }}
          component="div">
          {name}
        </Link>
      </CardContent>
      <CardActions sx={{ p: '16px', pt: '8px', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ fontSize: '18px', fontWeight: '600' }}>{`${currencyFormat(price)} руб`}</div>
          {inCart ? (
            <Button
              onClick={() => {
                navigate('/cart');
              }}
              sx={{
                backgroundColor: 'success.light',
                '&:hover': {
                  backgroundColor: 'success.light',
                },
              }}>
              В корзине
            </Button>
          ) : (
            <Button
              onClick={() => {
                addToCart(id, 1);
                setInCart(isProductInCart(id));
              }}>
              Купить
            </Button>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default Product;
