let length = []
export default function cardItems(state = length, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return [
                ...state,
                { cardData: action.data }
            ]
            break;
        case "REMOVE_TO_CART":
            const check = action.data._id
            let del
            for (const property in state) {
                if (state[property].cardData._id == check) {
                    del = property
                    break
                }
                else {
                    del = null
                }
            }
            if (del != null) {
                state.splice(del, 1)
            }
            return [
                ...state,
            ]
            break;
        case "GET_PRODUCT_DATA":
            break;
        default:
            return state
    }
}