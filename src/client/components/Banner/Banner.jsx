import React from 'react';
import clsx from 'clsx';
import styles from './Banner.module.scss';
const Banner = () => {
  return (
    <>
      <img src={'/images/banner.jpg'} alt="" className={clsx(styles.banner)} />
    </>
  );
};

export default Banner;
