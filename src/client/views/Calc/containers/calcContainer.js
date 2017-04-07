import {connect} from "react-redux";
import CalcView from "../views/CalcView";

const calcContainer = connect(
    state => ({ ...state.calc }),
    dispatch => ({ }),
)(CalcView);

export default calcContainer;