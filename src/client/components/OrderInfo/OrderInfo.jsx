import React from 'react';
import clsx from 'clsx';
import styles from './OrderInfo.module.scss';
import { useSelector } from 'react-redux';
import { Image } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { typeOrder } from '../../../admin/components/TableOrder/TableOrder';

const OrderInfo = () => {
  const {
    getOrderSingleState: { data: singleOrder },
    activeOrder,
  } = useSelector((state) => state.order);
  return (
    <>
      {activeOrder && singleOrder && (
        <>
          <div>
            <Typography
              variant="h5"
              sx={{
                fontWeight: '600',
              }}>
              {'Заказ №' + activeOrder?.number}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: '16px',
                fontWeight: '600',
                ...(activeOrder?.status === 'waiting' && { color: 'warning.main' }),
                ...(activeOrder?.status === 'completed' && { color: 'success.main' }),
                ...(activeOrder?.status === 'canceled' && { color: 'error.main' }),
              }}>
              {typeOrder(activeOrder?.status)}
            </Typography>
          </div>
          <div className={clsx(styles.productList)}>
            {singleOrder?.products.map((product) => (
              <div className={clsx(styles.productItem)}>
                {product?.image ? (
                  <img src={`http://localhost:8080/${product?.image}`} alt="" className={clsx(styles.productImg)} />
                ) : (
                  <div className={clsx(styles.productNoImage)}>
                    <Image />
                  </div>
                )}

                <div className={clsx(styles.productName)}>{product.name}</div>
                <div className={clsx(styles.productPrice)}>{`${product.productOrder.price} руб x ${product.productOrder.quantity}`}</div>
              </div>
            ))}
          </div>
          <div className={clsx(styles.total)}>
            <div className={clsx(styles.totalLabel)}>Итог</div>
            <div className={clsx(styles.totalValue)}>{singleOrder?.total + ' руб'}</div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderInfo;
