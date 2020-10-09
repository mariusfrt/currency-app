import {
  SET_SELECTED_BASE_CURRENCY,
  SET_SELECTED_TIME_INTERVAL
} from './actionTypes';


export const setSelectedBaseCurrency = selectedBaseCurrency => {
  return {
    type: SET_SELECTED_BASE_CURRENCY,
    selectedBaseCurrency
  };
};

export const setSelectedTimeInterval = selectedTimeInterval => {
  return {
    type: SET_SELECTED_TIME_INTERVAL,
    selectedTimeInterval
  };
};