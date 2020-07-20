import cartReducer from './cart';
import snackbarReducer from './snackbar';
import currency from './currency';
import {combineReducers} from 'redux';


const allReducers = combineReducers({
  cart: cartReducer,
  snackbar: snackbarReducer,
  currency: currency
});

export default allReducers;
