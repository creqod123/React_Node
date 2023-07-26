import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { io } from "socket.io-client";

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import index from './Services/Reducer/index'
const store = createStore(index)


// import store from '../src/createSlice/store';

// ============================================================================

// ============== socket ==============

let socket = null;
const initSocket = (token) => {
  socket = io(`localhost:4400?token=${token}`, { transports: ['websocket'] });
}

const token = localStorage.getItem('token');
if (token) {
  initSocket(token);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socket={socket} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
