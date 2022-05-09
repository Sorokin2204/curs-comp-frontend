import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './AddEditBrand.module.scss';
import { Alert, Box, Button, CircularProgress, Input, LinearProgress, Modal, Snackbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { brandReset, createBrand, getBrands, setActiveBrand, updateBrand } from '../../../redux/slices/brand.slice';
import Loading from '../Loading/Loading';
const AddEditBrand = ({ open, handleClose }) => {
  const [brandName, setBrandName] = useState('');
  const [openError, setOpenError] = useState(false);
  const {
    createBrandState: { loading, data, error },
    updateBrandState: { loading: loadingUpdate, data: dataUpdate, error: errorUpdate },
    activeBrand,
    brandModal,
  } = useSelector((state) => state.brand);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && data) {
      dispatch(getBrands());
    }
  }, [loading]);
  useEffect(() => {
    if (!loadingUpdate && dataUpdate) {
      dispatch(getBrands());
    }
  }, [loadingUpdate]);

  useEffect(() => {
    if (activeBrand) {
      setBrandName(activeBrand.name);
    }
  }, [activeBrand]);

  useEffect(() => {
    if (error) {
      setOpenError(true);
    }
  }, [error]);

  useEffect(() => {
    if (!brandModal) {
      dispatch(brandReset());
      setBrandName('');
    }
  }, [brandModal]);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={clsx(styles.modal)}>
          <span className={clsx(styles.modalTitle)}>{!activeBrand ? 'Добавить бренд' : `Изменить бренд "${activeBrand.name}"`}</span>
          <Input value={brandName} className={clsx(styles.modalInput)} onChange={(e) => setBrandName(e.target.value)} />
          {!activeBrand ? (
            <Button className={clsx(styles.modalBtn)} onClick={() => dispatch(createBrand(brandName))}>
              Добавить
            </Button>
          ) : (
            <Button
              sx={{
                backgroundColor: 'success.light',
                '&:hover': {
                  backgroundColor: 'success.light',
                },
              }}
              className={clsx(styles.modalBtn)}
              onClick={() => dispatch(updateBrand({ id: activeBrand.id, name: brandName }))}>
              Изменить
            </Button>
          )}
        </div>
      </Modal>
      {loading && <Loading />}
      <Snackbar autoHideDuration={2000} open={openError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEditBrand;
