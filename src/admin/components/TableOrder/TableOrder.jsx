import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './TableOrder.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { getOrders, getOrderSingle, setActiveOrder } from '../../../redux/slices/order.slice';
import { useDispatch, useSelector } from 'react-redux';
import OrderInfo from '../OrderInfo/OrderInfo';
import Loading from '../Loading/Loading';

export const typeOrder = (type) => {
  switch (type) {
    case 'waiting':
      return 'В обработке';
    case 'canceled':
      return 'Отменен';
    case 'completed':
      return 'Завершен';

    default:
      break;
  }
};

const TableOrder = () => {
  const [openOrderInfo, setOpenOrderInfo] = useState(false);
  const {
    getOrdersState: { data, loading },
    getOrderSingleState: { data: orderSingleData, loading: orderSingleLoading },
  } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      {!loading && data && (
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '40px' }}></TableCell>
                <TableCell sx={{ width: '50px' }}>Номер</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>ФИО</TableCell>
                <TableCell>Кол-во товаров</TableCell>
                <TableCell>Итог</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order) => (
                <TableRow key={'sdf'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ width: '40px' }}>
                    <IconButton
                      onClick={() => {
                        setOpenOrderInfo(true);
                        dispatch(setActiveOrder(order.id));
                        dispatch(getOrderSingle(order.id));
                      }}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {order.number}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {typeOrder(order.status)}
                  </TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {openOrderInfo && !orderSingleLoading && orderSingleData && <OrderInfo open={openOrderInfo} onClose={() => setOpenOrderInfo(false)} />}
      {orderSingleLoading && <Loading />}
    </>
  );
};

export default TableOrder;
