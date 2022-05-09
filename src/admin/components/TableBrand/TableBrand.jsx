import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './TableBrand.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, setActiveBrand } from '../../../redux/slices/brand.slice';
const TableBrand = () => {
  const {
    getBrandsState: { data, loading },
  } = useSelector((state) => state.brand);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  return (
    <>
      {!loading && data && (
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '40px' }}></TableCell>
                <TableCell sx={{ width: '50px' }}>ID</TableCell>
                <TableCell>Название</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((brand) => (
                <TableRow key={'sdf'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ width: '40px' }}>
                    <IconButton
                      onClick={() => {
                        dispatch(
                          setActiveBrand({
                            id: brand.id,
                            name: brand.name,
                          }),
                        );
                      }}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row" sx={{ width: '50px' }}>
                    {brand.id}
                  </TableCell>
                  <TableCell>{brand.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TableBrand;
