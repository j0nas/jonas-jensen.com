import { Reducer } from 'light-form';
import calcReducer from './calcReducer';
import onStateChange from './interceptCalcStateChange';

export default {
  calc: calcReducer,
  fi: Reducer('fi', {}, onStateChange),
};
