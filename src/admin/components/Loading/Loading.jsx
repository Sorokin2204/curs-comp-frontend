import React from 'react';
import clsx from 'clsx';
import styles from './Loading.module.scss';
import { CircularProgress } from '@mui/material';
const Loading = () => {
  return (
    <>
      <div className={clsx(styles.overlay)}>
        <CircularProgress className={clsx(styles.loader)} />
      </div>
    </>
  );
};

export default Loading;
