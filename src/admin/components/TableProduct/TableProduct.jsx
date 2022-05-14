import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './TableProduct.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getBrands, setActiveBrand, setActiveCategory, setActiveProduct } from '../../../redux/slices/product.slice';
import { getCategories } from '../../../redux/slices/product.slice';
import { useNavigate } from 'react-router';
import { getProducts } from '../../../redux/slices/product.slice';
import Loading from '../Loading/Loading';
import { currencyFormat } from '../../../utils/currencyFormat';

const TableProduct = () => {
  const {
    getProductsState: { data, loading },
    deleteProductState: { loading: deleteLoading, data: deleteData },
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (deleteData && !deleteLoading) {
      dispatch(getProducts());
    }
  }, [deleteData, deleteLoading]);

  return (
    <>
      {!loading && data && (
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '40px' }}></TableCell>
                <TableCell sx={{ width: '40px' }}></TableCell>
                <TableCell sx={{ width: '50px' }}>ID</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Бренд</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((product) => (
                <TableRow key={'sdf'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ width: '40px' }}>
                    <IconButton
                      onClick={() => {
                        dispatch(setActiveProduct(product));
                        navigate('/admin/product/add');
                      }}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ width: '40px' }}>
                    <IconButton
                      onClick={() => {
                        dispatch(deleteProduct(product.id));
                      }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" sx={{ width: '50px' }}>
                    {product.id}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{currencyFormat(product.price) + ' руб'}</TableCell>

                  <TableCell>{product?.category?.name}</TableCell>
                  <TableCell>{product?.brand?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {deleteLoading && <Loading />}
    </>
  );
};

export default TableProduct;
