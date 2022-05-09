import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './TableAttributeCategory.module.scss';
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
import { getBrands, setActiveBrand } from '../../../redux/slices/brand.slice';
const TableAttributeCategory = ({ onEdit, onRemove, activeAttribute }) => {
  const { categoryAttributes } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getBrands());
  }, []);

  const getNameTypeAttribute = (typeSlug) => {
    switch (typeSlug) {
      case 'text':
        return 'Строка';
      case 'select':
        return 'Список';
      case 'checkbox':
        return 'Да/Нет';
      case 'number':
        return 'Число';
      default:
        break;
    }
  };

  return (
    <>
      {categoryAttributes.length !== 0 && (
        <TableContainer component={Paper} sx={{ width: 'min-content', marginLeft: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryAttributes.map((attribute) => (
                <TableRow
                  sx={{
                    minHeight: '51px',
                    height: '51px',
                    '&:last-child td, &:last-child th': { border: 0 },
                    ...(activeAttribute?.oldName === attribute.name && { backgroundColor: 'primary.light', color: 'white' }),
                    ...(attribute?.status === 'deleted' && { backgroundColor: 'error.light', color: 'white' }),
                    ...(attribute?.status === 'added' && { backgroundColor: 'success.light', color: 'white' }),
                  }}>
                  <TableCell component="th" scope="row">
                    {attribute.name}
                  </TableCell>
                  <TableCell>{getNameTypeAttribute(attribute.type)}</TableCell>
                  <TableCell sx={{ width: '50px', minWidth: '50px' }}>
                    {attribute?.status !== 'deleted' && (
                      <IconButton
                        sx={{ ...(activeAttribute?.oldName === attribute.name && { color: 'white' }), ...(attribute?.status === 'added' && { color: 'white' }) }}
                        onClick={() => {
                          onEdit(attribute);
                        }}>
                        <Edit />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell sx={{ width: '50px', minWidth: '50px' }}>
                    {attribute?.status !== 'deleted' && (
                      <IconButton
                        sx={{ color: 'error.main' }}
                        onClick={() => {
                          onRemove(attribute);
                        }}>
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TableAttributeCategory;
