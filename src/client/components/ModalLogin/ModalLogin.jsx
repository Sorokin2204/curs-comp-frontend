import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './ModalLogin.module.scss';
import { Alert, Button, Modal, Snackbar, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { closeUserModal, createUser, loginUser } from '../../../redux/slices/user.slice';
import NumberFormat from 'react-number-format';
import Loading from '../../../admin/components/Loading/Loading';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ pt: '30px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ModalLogin = () => {
  const [value, setValue] = useState(0);
  const [fullName, setFullName] = useState('');
  const [login, setLogin] = useState('');
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState('');
  const [signInLogin, setSignInLogin] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [openError, setOpenError] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const {
    userModal,
    createUserState: { data: tokenUser, loading: loadingRegister, error: errorRegister },
    loginUserState: { data: tokenUserLogin, loading: loadingLogin, error: errorLogin },
  } = useSelector((state) => state.user);

  const onClickRegister = () => {
    dispatch(
      createUser({
        login: login,
        fullName: fullName,
        password: password,
        phone: phone,
      }),
    );
  };
  const onClickLogin = () => {
    dispatch(
      loginUser({
        login: signInLogin,
        password: signInPassword,
      }),
    );
  };
  useEffect(() => {
    if (tokenUser) {
      localStorage.setItem('token', tokenUser.token);
      window.location.reload();
    }
  }, [tokenUser]);

  useEffect(() => {
    if (tokenUserLogin) {
      localStorage.setItem('token', tokenUserLogin.token);
      window.location.reload();
    }
  }, [tokenUserLogin]);

  useEffect(() => {
    if (errorLogin || errorRegister) {
      setOpenError(true);
    }
  }, [errorLogin, errorRegister]);

  return (
    <>
      <Modal open={userModal} onClose={() => dispatch(closeUserModal())}>
        <div className={styles.modal}>
          <Box sx={{}}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Вход" {...a11yProps(0)} />
                <Tab label="Регистрация" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <TextField
                value={signInLogin}
                onChange={(e) => {
                  setSignInLogin(e.target.value);
                }}
                sx={{ width: '100%', mb: '15px' }}
                label={'Логин'}
              />
              <TextField
                value={signInPassword}
                onChange={(e) => {
                  setSignInPassword(e.target.value);
                }}
                sx={{ width: '100%', mb: '20px' }}
                type="password"
                label={'Пароль'}
              />
              <Button sx={{ width: '100%', pt: '10px', pb: '10px' }} size="large" onClick={() => onClickLogin()} disabled={!signInLogin || !signInPassword}>
                Войти
              </Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} sx={{ width: '100%', mb: '15px' }} label={'ФИО'} />
              <TextField value={login} onChange={(e) => setLogin(e.target.value)} sx={{ width: '100%', mb: '15px' }} label={'Логин'} />
              <NumberFormat value={phone} onValueChange={(e) => setPhone(e.floatValue)} format={'+375(##) ### ## ##'} customInput={TextField} sx={{ width: '100%', mb: '15px' }} label={'Телефон'} />
              <TextField value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: '100%', mb: '20px' }} type="password" label={'Пароль'} />
              <Button sx={{ width: '100%', pt: '10px', pb: '10px' }} size="large" disabled={!fullName || !login || !password || !phone || !(phone >= 100000000)} onClick={() => onClickRegister()}>
                Зарегестрироваться
              </Button>
            </TabPanel>
          </Box>
        </div>
      </Modal>
      <Snackbar autoHideDuration={2000} open={openError} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={() => setOpenError(false)}>
        <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
          {errorLogin?.message && value === 0 ? errorLogin?.message : errorRegister?.message && value === 1 ? errorRegister?.message : ''}
        </Alert>
      </Snackbar>
      {(loadingRegister || loadingLogin) && <Loading />}
    </>
  );
};

export default ModalLogin;
