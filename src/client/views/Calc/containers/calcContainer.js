import { connect } from 'react-redux';
import CalcView from '../views/CalcView';
import { updateField } from '../actions/calcActions';

const calcContainer = connect(
    state => ({ expenditureIsAnnual: state.fi.expenditureIsAnnual }),
    dispatch => ({
      update: (name, value) => dispatch(updateField(name, value)),
    }),
)(CalcView);

export default calcContainer;
