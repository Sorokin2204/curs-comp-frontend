import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { getProductAttributes } from '../../redux/slices/attribute.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { getProducts, getSingleProduct } from '../../redux/slices/product.slice';
import { Box, Button, IconButton, Input, TextField, Typography } from '@mui/material';
import { Add, Check, CheckCircle, CheckCircleOutline, CheckOutlined, Image, Remove } from '@mui/icons-material';
import { currencyFormat } from '../../utils/currencyFormat';
import Product from '../components/Product/Product';
import { isProductInCart } from '../../utils/isProductInCart';
import { addToCart } from '../../utils/addToCart';
const ProductSinglePage = () => {
  const location = useLocation();
  let { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  const {
    getSingleProductState: { data: singleProduct },
    getProductsState: { data: similarProducts },
  } = useSelector((state) => state.product);
  const {
    getProductAttributesState: { data: productAttributes },
  } = useSelector((state) => state.attribute);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location) {
      dispatch(getSingleProduct(productId));
      dispatch(getProductAttributes(productId));
    }
  }, [location]);

  useEffect(() => {
    if (singleProduct) {
      setInCart(isProductInCart(singleProduct?.id));
      dispatch(getProducts({ categoryId: singleProduct.categoryId, limit: 4, exclude: singleProduct.id }));
    }
  }, [singleProduct]);

  useEffect(() => {
    console.log(similarProducts);
  }, [similarProducts]);

  useEffect(() => {
    return () => {
      console.log('EXIT');
    };
  }, []);

  const onClickAddToCart = () => {
    addToCart(singleProduct?.id, quantity);
    setInCart(isProductInCart(singleProduct?.id));
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridGap: '40px',
          gridTemplateColumns: '1fr 1fr',
          marginTop: '20px',
        }}>
        {singleProduct?.image ? (
          <img style={{ width: '100%', height: 'auto' }} src={'http://localhost:8080/' + singleProduct?.image} />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              border: '3px solid rgba(0, 0, 0, 0.23)',
              borderRadius: '5px',
              height: '35vw',
              '& svg': {
                color: 'grey !important',
                fontSize: '70px',
              },
            }}>
            <Image sx={{}} />
          </Box>
        )}

        <div>
          <Typography
            variant="h5"
            sx={{
              marginBottom: '20px',
            }}>
            {singleProduct?.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                fontSize: '26px',
                fontWeight: '500',
              }}>
              {currencyFormat(singleProduct?.price) + ' руб'}
            </Box>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #e0e0e0',
                padding: '2px 10px',
                borderRadius: '10px',
                marginLeft: '10px',
              }}>
              {singleProduct?.category.name}
            </Box>
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                border: '1px solid #e0e0e0',
                padding: '2px 10px',
                borderRadius: '10px',
                marginLeft: '10px',
              }}>
              {singleProduct?.brand.name}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridGap: '20px',
              marginTop: '20px',
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
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
            {inCart ? (
              <Button
                onClick={() => navigate('/cart')}
                sx={{
                  backgroundColor: 'success.light',
                  '&:hover': {
                    backgroundColor: 'success.light',
                  },
                }}
                endIcon={<CheckCircleOutline sx={{ mb: '2px' }} />}>
                В корзине
              </Button>
            ) : (
              <Button onClick={() => onClickAddToCart()}>Добавить в корзину</Button>
            )}
          </Box>
        </div>
      </div>

      <div
        style={{
          maxWidth: '600px',
          margin: '50px auto 0 auto',
        }}>
        {productAttributes?.map((productAttribute) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '18px',
              padding: '5px',
              '& + &': {
                borderTop: '1px solid rgba(0, 0, 0, 0.23)',
              },
            }}>
            <div
              style={{
                color: 'rgba(0, 0, 0, 0.5)',
              }}>
              {productAttribute.label}
            </div>
            <div>{productAttribute?.labelOption ? productAttribute?.labelOption : typeof productAttribute.value === 'boolean' ? (productAttribute.value ? '+' : '-') : productAttribute.value}</div>
          </Box>
        ))}
      </div>
      <div>
        <Typography
          variant="h4"
          sx={{
            ml: 'auto',
            mt: '50px',
            mb: '20px',
          }}>
          Похожие товары
        </Typography>
        <div
          style={{
            paddingBottom: '60px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridGap: '20px',
          }}>
          {similarProducts?.map((product) => (
            <Product {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductSinglePage;
