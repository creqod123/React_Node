import { ADD_TO_CART } from "../constants"

export const addtoCart = (data) => {
    return {
        type: ADD_TO_CART,
        data: data
    }
}

export const RemovetoCart = (data) => {
    return {
        type: "REMOVE_TO_CART",
        data: data
    }
}

export const getAllitem = () => {
    return {
        type: "GET_ALL_ITEMS",
    }
}