export default function getItem(state = [], action) {
    switch (action.type) {
        case "GET_ALL_ITEMS":
            return [
                console.log("Hello world")
            ]
            break;
        default:
            return state
    }
}