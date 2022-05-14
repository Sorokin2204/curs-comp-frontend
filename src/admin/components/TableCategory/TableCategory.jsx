import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './TableCategory.module.scss';
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
import { deleteCategory, getBrands, setActiveBrand, setActiveCategory } from '../../../redux/slices/category.slice';
import { getCategories } from '../../../redux/slices/category.slice';
import { useNavigate } from 'react-router';
import Loading from '../Loading/Loading';
const TableCategory = () => {
  const {
    getCategoriesState: { data, loading },
    deleteCategoryState: { data: deleteData, loading: deleteLoading },
  } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((category) => (
                <TableRow key={'sdf'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ width: '40px' }}>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          setActiveCategory({
                            id: category.id,
                            name: category.name,
                          }),
                        );
                        navigate('/admin/category/add');
                      }}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ width: '40px' }}>
                    <IconButton
                      onClick={() => {
                        dispatch(deleteCategory(category.id));
                        dispatch(getCategories());
                      }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" sx={{ width: '50px' }}>
                    {category.id}
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
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

export default TableCategory;
