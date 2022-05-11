import React from 'react';
import clsx from 'clsx';
import styles from './ContentProducts.module.scss';
import TableProduct from '../TableProduct/TableProduct';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { AddOutlined } from '@mui/icons-material';
const ContentProducts = () => {
  const navigate = useNavigate();
  return (
    <>
      <TableProduct />{' '}
      <IconButton className={clsx(styles.addProduct)} onClick={() => navigate('/admin/product/add')}>
        <AddOutlined />
      </IconButton>
    </>
  );
};

export default ContentProducts;
