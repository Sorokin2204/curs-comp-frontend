import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Wrapper from './admin/Wrapper';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SocketContext, socket } from './socket';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <SocketContext.Provider value={socket}>
    <Router>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </SocketContext.Provider>,
);
