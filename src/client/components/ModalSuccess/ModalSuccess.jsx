import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './ModalSuccess.module.scss';
import { Box, Button, Modal } from '@mui/material';
import { Check, CheckBoxOutlined, CheckCircleOutlined, CheckOutlined } from '@mui/icons-material';
const ModalSuccess = ({ open, onClose }) => {
  useEffect(() => {
    return () => {
      onClose();
    };
  }, []);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className={styles.modal}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '500', flexDirection: 'column' }}>
            <CheckCircleOutlined
              sx={{
                fontSize: '40px',
                color: 'success.main',
                marginBottom: '10px',
              }}
            />
            Ваша заказ успешно оформлен
          </Box>
          <Button
            onClick={onClose}
            sx={{
              width: '100%',
              marginTop: '20px',
              paddingTop: '8px',
              paddingBottom: '8px',
            }}>
            Отлично
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalSuccess;
