import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/product.slice';
import Product from '../components/Product/Product';
import { Typography } from '@mui/material';
const CategorySinglePage = () => {
  let { categoryId } = useParams();
  const dispatch = useDispatch();

  const {
    getProductsState: { data: products },
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({ categoryId }));
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: '30px',
          mt: '20px',
        }}>
        {products?.[0]?.category?.name}
      </Typography>
      <div
        style={{
          display: 'grid',
          gridGap: '20px',
          gridTemplateColumns: 'repeat(3,1fr)',
        }}>
        {products?.map((product) => (
          <Product {...product} />
        ))}
      </div>
    </>
  );
};

export default CategorySinglePage;
