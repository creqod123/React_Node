import cardItems from "./carts";
import getItem from "./pagination";
import { combineReducers } from "redux";

export default combineReducers({
    cardItems,
    getItem,
})