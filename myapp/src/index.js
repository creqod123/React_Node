import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import index from './Services/Reducer/index'
import { io } from "socket.io-client";

// ============== socket ==============

let socket = null;
const initSocket = (token) => {
  socket = io(`localhost:4400?token=${token}`, { transports: ['websocket'] });
}

const token = localStorage.getItem('token');
if (token) {
  initSocket(token);
}

const store = createStore(index)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>
);

reportWebVitals();
