import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './OrderInfo.module.scss';
import { Button, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import { getOrders, getOrderSingle, orderReset, updateStatusOrder } from '../../../redux/slices/order.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '@mui/icons-material';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router';
const OrderInfo = ({ open, onClose }) => {
  const {
    getOrderSingleState: { data, loading },
    updateStatusOrderState: { data: updateStatusData, loading: updateStatusLoading },
  } = useSelector((state) => state.order);
  const [activeStatus, setActiveStatus] = useState(data?.status);
  const statusOrders = [
    { label: 'В обработке', value: 'waiting' },
    { label: 'Отменен', value: 'canceled' },
    { label: 'Завершен', value: 'completed' },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    if (updateStatusData) {
      onClose();
      dispatch(orderReset());
      dispatch(getOrders());
    }
  }, [updateStatusData]);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className={clsx(styles.modal)}>
          <div className={clsx(styles.modalHead)}>
            <div className={clsx(styles.modalSelect)}>
              <InputLabel sx={{ fontSize: '14px' }} id={`order-status`}>
                Статус
              </InputLabel>
              <Select
                size="small"
                labelId={`order-status`}
                value={activeStatus}
                onChange={(e) => {
                  setActiveStatus(e.target.value);
                }}>
                {statusOrders.map((status, i) => (
                  <MenuItem value={status.value} key={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <span className={clsx(styles.modalTitle)}>{`Заказ №${data?.number}`}</span>
            <Button
              onClick={() =>
                dispatch(
                  updateStatusOrder({
                    id: data.id,
                    status: activeStatus,
                  }),
                )
              }
              sx={{ backgroundColor: 'success.light' }}>
              Изменить
            </Button>
          </div>

          <div className={clsx(styles.info)}>
            <div className={clsx(styles.infoItem)}>
              <div className={clsx(styles.infoLabel)}>ФИО</div>
              <div className={clsx(styles.infoValue)}>{data.user.fullName}</div>
            </div>
            <div className={clsx(styles.infoItem)}>
              <div className={clsx(styles.infoLabel)}>Телефон</div>
              <div className={clsx(styles.infoValue)}>{data.user.phone}</div>
            </div>
          </div>
          <div className={clsx(styles.productList)}>
            {data.products.map((product) => (
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
            <div className={clsx(styles.totalValue)}>{data.total + ' руб'}</div>
          </div>
        </div>
      </Modal>
      {updateStatusLoading && <Loading />}
    </>
  );
};

export default OrderInfo;
