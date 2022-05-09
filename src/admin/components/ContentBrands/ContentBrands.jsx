import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './ContentBrands.module.scss';
import { Button, IconButton } from '@mui/material';
import { Add, AddOutlined } from '@mui/icons-material';
import AddEditBrand from '../AddEditBrand/AddEditBrand';
import TableBrand from '../TableBrand/TableBrand';
import { useDispatch, useSelector } from 'react-redux';
import { closeBrandModal, openBrandModal } from '../../../redux/slices/brand.slice';
const ContentBrands = () => {
  const dispatch = useDispatch();
  const { brandModal } = useSelector((state) => state.brand);
  return (
    <>
      <TableBrand />
      <IconButton className={clsx(styles.addBrand)} onClick={() => dispatch(openBrandModal())}>
        <AddOutlined />
      </IconButton>

      <AddEditBrand open={brandModal} handleClose={() => dispatch(closeBrandModal())} />
    </>
  );
};

export default ContentBrands;
