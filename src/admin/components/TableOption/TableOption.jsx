import React from 'react';
import clsx from 'clsx';
import styles from './TableOption.module.scss';
import { Delete } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
const TableOption = ({ options, onRemove }) => {
  return (
    <>
      {options && options?.length !== 0 && (
        <TableContainer component={Paper} sx={{ width: 'min-content' }}>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {options.map((option) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, minHeight: '51px', height: '50px', ...(option?.status === 'added' && { backgroundColor: 'success.light', color: 'white' }), ...(option?.status === 'deleted' && { backgroundColor: 'error.light', color: 'white' }) }}>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{option.name}</TableCell>
                  <TableCell sx={{ minHeight: '51px', height: '50px', minWidth: '50px', width: '50px' }}>
                    {option?.status !== 'deleted' && (
                      <IconButton
                        sx={{ color: 'error.main' }}
                        onClick={() => {
                          onRemove(option);
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

export default TableOption;
