import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import ContentBrands from '../components/ContentBrands/ContentBrands';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../redux/slices/user.slice';
import { useNavigate } from 'react-router';
const AdminBrandsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const {
    checkAuthState: { data: authData, loading: authLoading, error: authError },
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (authData) {
      if (authData?.type === 'admin') {
        setIsAuth(true);
      } else {
        navigate('/');
      }
    }
  }, [authData]);
  useEffect(() => {
    if (authError) {
      navigate('/');
    }
  }, [authError]);
  return <>{isAuth && <ContentBrands />}</>;
};

export default AdminBrandsPage;
