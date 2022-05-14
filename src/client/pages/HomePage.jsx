import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, productReset } from '../../redux/slices/product.slice';
import Banner from '../components/Banner/Banner';
import Product from '../components/Product/Product';
const HomePage = () => {
  const {
    getProductsState: { data: products },
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({ sort: true, limit: 6 }));
    return () => {
      dispatch(productReset());
    };
  }, []);

  return (
    <>
      <Banner />
      <Typography variant="h4" sx={{ mt: '30px', mb: '20px' }}>
        Новые товары
      </Typography>
      <div
        style={{
          display: 'grid',
          gridGap: '20px',
          gridTemplateColumns: '1fr 1fr 1fr',
          paddingBottom: '40px',
        }}>
        {products && products.map((product) => <Product {...product} />)}
      </div>
    </>
  );
};

export default HomePage;
