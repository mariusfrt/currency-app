import {
  SET_CURRENCY_LIST,
  SET_CURRENCY_HISTORY
} from './actionTypes';
import { 
  uiStartLoadCurrencyList, 
  uiStopLoadCurrencyList,
  uiStartLoadCurrencyHistory,
  uiStopLoadCurrencyHistory
} from './index';
import { currencyBaseUrl } from '../../../app.json';
import { sortRatesByLabel } from '../../utils/helpers';
import axios from 'axios';
import moment from 'moment';

export const getCurrencyList = baseCurrency => {
  return dispatch => {
      dispatch(uiStartLoadCurrencyList());
      axios.get(`${currencyBaseUrl}/latest?base=${baseCurrency}`)
        .then(res => {
          const { rates, base, date } = res.data;
          dispatch(setCurrencyList(res.data, moment().format()));
          dispatch(uiStopLoadCurrencyList());
        })
        .catch(err => {
          console.log(err);
          dispatch(uiStopLoadCurrencyList());
        });
  };
};

export const setCurrencyList = (currencyList, lastSyncDate) => {
  return {
    type: SET_CURRENCY_LIST,
    currencyList,
    lastSyncDate
  };
};

export const getCurrencyHistory = (baseCurrency, currencies, days) => {
  const endAt = moment().format('YYYY-MM-DD');
  const startAt = moment().subtract(days, 'd').format('YYYY-MM-DD');
  return dispatch => {
      dispatch(uiStartLoadCurrencyHistory());
      axios.get(`${currencyBaseUrl}/history?base=${baseCurrency}&symbols=${currencies}&start_at=${startAt}&end_at=${endAt}`)
        .then(res => {
          let chartDataSet={};
          const sortedRates = Object.entries(res.data?.rates || {}).sort(sortRatesByLabel);
          for (const [timestamp, values] of sortedRates) {            
            for (const [currencyName, currencyValue] of Object.entries(values)) {
              if(!chartDataSet[currencyName]){
                chartDataSet[currencyName] = {};
                chartDataSet[currencyName]['labels'] = [];
                chartDataSet[currencyName]['data'] = [];
              }
              
              chartDataSet[currencyName]['labels'].push(moment(timestamp).format('DD-MMM'));
              chartDataSet[currencyName]['data'].push(currencyValue);
              
            }
          }
          dispatch(setCurrencyHistory(chartDataSet));
          dispatch(uiStopLoadCurrencyHistory());
        })
        .catch(err => {
          console.log(err);
          dispatch(uiStopLoadCurrencyHistory());
        });
  };
};

export const setCurrencyHistory = currencyHistory => {
  return {
    type: SET_CURRENCY_HISTORY,
    currencyHistory
  };
};
