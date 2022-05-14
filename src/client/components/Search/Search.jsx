import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Search.module.scss';
import { Box, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../../redux/slices/product.slice';
import { Image } from '@mui/icons-material';
import { currencyFormat } from '../../../utils/currencyFormat';
import { useOutsideAlerter } from '../../../utils/useClickOutSide';
import { useNavigate } from 'react-router';
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const {
    searchProductsState: { data: searchProductsData },
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setOpenSearch(false));
  useEffect(() => {
    if (!searchTerm) setOpenSearch(false);
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setOpenSearch(true);
        dispatch(searchProducts(searchTerm));
      } else {
        setOpenSearch(false);
      }
      // Send Axios request here
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  const navigate = useNavigate();

  return (
    <>
      <Box
        ref={wrapperRef}
        sx={{
          position: 'relative',
        }}
        id="search"
        // onBlur={() => {
        //   setOpenSearch(false);
        // }}
        onFocus={() => {
          if (searchTerm) setOpenSearch(true);
        }}>
        <TextField value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={clsx(styles.search)} autoComplete="off" placeholder="Поиск" />
        {openSearch && (
          <Box
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              top: '100%',
              left: '0',
              width: '100%',
              minHeight: '60px',
              backgroundColor: '#fff',
              boxShadow: 2,
              zIndex: '100',
              borderRadius: '5px',
              // backgroundColor: 'black',
            }}>
            {searchProductsData && searchProductsData.length !== 0 ? (
              <>
                {searchProductsData?.map((product) => (
                  <Box
                    onClick={(e) => {
                      navigate('/product/' + product.id);
                      setSearchTerm('');
                    }}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '70px 1fr auto',
                      '& + &': {
                        borderTop: '1px solid grey',
                        // marginTop: '5px',
                        // paddingTop: '10px',
                      },
                    }}>
                    {product?.image ? (
                      <img
                        src={'http://localhost:8080/' + product?.image}
                        style={{
                          padding: '5px',
                          width: '100%',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '70px',
                          '& svg': {
                            color: 'grey !important',
                          },
                        }}>
                        <Image />
                      </Box>
                    )}

                    <Box
                      sx={{
                        marginLeft: '5px',
                        marginTop: '7px',
                      }}>
                      {product.name}
                    </Box>
                    <Box
                      sx={{
                        alignSelf: 'center',
                        padding: '10px',
                        fontSize: '16px',
                        fontWeight: '600',
                      }}>
                      {currencyFormat(product.price) + ' руб'}
                    </Box>
                  </Box>
                ))}
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '60px',
                }}>
                <div>Ничего не найдено</div>
              </div>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Search;
