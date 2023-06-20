import { connect } from "react-redux";
import Navbar from "../components/navbar/navbar";



const mapSateProps = state => ({
    data: state.cardItems
})

const mapDispatchProps = dispatch => ({

})

export default connect(mapSateProps, mapDispatchProps)(Navbar)
