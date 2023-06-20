import cardItems from "./reducer";
import getItem from "./reducers2";
import { combineReducers } from "redux";

export default combineReducers({
    cardItems,
    getItem
})