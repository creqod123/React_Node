import { configureStore } from '@reduxjs/toolkit';
import cardItems from "../Services/Reducer/carts";
import getItem from "../Services/Reducer/pagination";
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cardItems: cardItems,
    getItem: getItem
  },
});

export default store;
