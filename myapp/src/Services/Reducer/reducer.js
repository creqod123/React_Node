export default function cardItems(state = [], action) {
    switch (action.type) {
        case "ADD_TO_CART":
            getcartlength("Add", state.length)
            return [
                ...state,
                { cardData: action.data }
            ]
            break;
        case "REMOVE_TO_CART":
            var ID = action.data.ids
            if (state.length >= 0) {
                for (var i = 0; i < state.length; i++) {
                    if (state[i].cardData.ids == ID) {
                        var b = i
                        state.splice(b, 1)
                        break;
                    }
                }
            }
            getcartlength("remove", state.length)
            return [
                ...state,
            ]
            break;  
        case "GET_PRODUCT_DATA":
            break;
        default:
            return state
    }
    function getcartlength(check, a) {
        if (check === "Add") {
            document.getElementById('cartlength').innerHTML = a + 1
        }
        else {
            document.getElementById('cartlength').innerHTML = a
        }
    }
}