import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const createUser = createAsyncThunk('user/createUser', (user, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/user/register`, user)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const loginUser = createAsyncThunk('user/loginUser', (user, { rejectWithValue }) => {
  return axios
    .post(`http://localhost:8080/api/user/login`, user)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const getUsers = createAsyncThunk('user/getUsers', (obj, { rejectWithValue }) => {
  return axios
    .get(`http://localhost:8080/api/user/list`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

export const checkAuth = createAsyncThunk('user/checkAuth', (obj, { rejectWithValue }) => {
  const token = localStorage?.getItem('token');
  if (!token) rejectWithValue('Пользователь не авторизирован');
  return axios
    .get(`http://localhost:8080/api/user/check-auth`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data));
});

const userInitialState = {
  createUserState: {
    data: null,
    loading: false,
    error: null,
  },
  checkAuthState: {
    data: null,
    loading: false,
    error: null,
  },
  getUsersState: {
    data: null,
    loading: false,
    error: null,
  },
  loginUserState: {
    data: null,
    loading: false,
    error: null,
  },
  userModal: false,
  successModal: false,
  activeUser: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    userReset: (state, action) => {
      state.createUserState = userInitialState.createUserState;
      state.updateUserState = userInitialState.updateUserState;
      state.checkAuthState = userInitialState.checkAuthState;
      state.loginUserState = userInitialState.loginUserState;

      state.activeUser = null;
    },
    closeUserModal: (state) => {
      state.userModal = false;
    },
    openUserModal: (state) => {
      state.userModal = true;
    },
    closeSuccessModal: (state) => {
      state.successModal = false;
    },
    openSuccessModal: (state) => {
      state.successModal = true;
    },
    setActiveUser: (state, { payload }) => {
      state.activeUser = payload;
      state.userModal = true;
    },
  },
  extraReducers: {
    // CREATE
    [createUser.pending]: (state, action) => {
      state.createUserState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [createUser.fulfilled]: (state, action) => {
      state.createUserState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [createUser.rejected]: (state, action) => {
      state.createUserState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // GET
    [getUsers.pending]: (state, action) => {
      state.getUsersState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [getUsers.fulfilled]: (state, action) => {
      state.getUsersState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [getUsers.rejected]: (state, action) => {
      state.getUsersState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
    // CHECK AUTH
    [checkAuth.pending]: (state, action) => {
      state.checkAuthState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.checkAuthState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [checkAuth.rejected]: (state, action) => {
      state.checkAuthState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    }, // LOGIN USER
    [loginUser.pending]: (state, action) => {
      state.loginUserState = {
        loading: true,
        data: null,
        error: null,
      };
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loginUserState = {
        loading: false,
        data: action.payload,
        error: null,
      };
    },
    [loginUser.rejected]: (state, action) => {
      state.loginUserState = {
        loading: false,
        data: null,
        error: action.payload,
      };
    },
  },
});
export const { userReset, closeUserModal, openUserModal, setActiveUser, closeSuccessModal, openSuccessModal } = userSlice.actions;
export const userReducer = userSlice.reducer;
