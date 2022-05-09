import React from 'react';
import clsx from 'clsx';
import styles from './ContentCategories.module.scss';
import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import TableCategory from '../TableCategory/TableCategory';
const ContentCategories = () => {
  const navigate = useNavigate();
  return (
    <>
      <TableCategory />
      <IconButton className={clsx(styles.addCategory)} onClick={() => navigate('/admin/category/add')}>
        <AddOutlined />
      </IconButton>
    </>
  );
};

export default ContentCategories;
