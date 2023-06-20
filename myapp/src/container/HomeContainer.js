import { connect } from "react-redux";
import Home from "../components/users/home";
import { addtoCart,RemovetoCart } from "../Services/Actions/actions";

const mapSateProps = state=>({
    data:state.cardItems
})


const mapDispatchProps=dispatch=>({
    addtoCartHandler:data=>dispatch(addtoCart(data)),   
    RemovetoCartHandler:data=>dispatch(RemovetoCart(data))
})

export default connect(mapSateProps,mapDispatchProps)(Home)