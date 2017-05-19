import { Reducer } from 'light-form';
import onStateChange from './interceptCalcStateChange';

export default {
  fi: Reducer('fi', {}, onStateChange),
};
