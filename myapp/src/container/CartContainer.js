import { connect } from "react-redux";
import Cart from "../components/users/cart";
import { addtoCart, RemovetoCart } from "../Services/Actions/actions";


const mapSateProps = state => ({
    data: state.cardItems
})

const mapDispatchProps = dispatch => ({
    addtoCartHandler: data => dispatch(addtoCart(data)),
    RemovetoCartHandler: data => dispatch(RemovetoCart(data))
})

export default connect(mapSateProps, mapDispatchProps)(Cart)

// export default Home 