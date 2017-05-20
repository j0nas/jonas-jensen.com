import { connect } from 'react-redux';
import CalcView from '../views/CalcView';

const calcContainer = connect(
    state => ({ expenditureIsAnnual: state.fi.expenditureIsAnnual }),
)(CalcView);

export default calcContainer;
