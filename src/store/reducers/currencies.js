import { 
  SET_CURRENCY_LIST,
  SET_CURRENCY_HISTORY
} from '../actions/actionTypes';

const initialState = {
  currencyList: null,
}

const reducer = (state = initialState, action) => {    
    switch(action.type){
        case SET_CURRENCY_LIST:            
            return {
              ...state,
              currencyList: action.currencyList,
              lastSyncDate: action.lastSyncDate
            }
        case SET_CURRENCY_HISTORY:            
            return {
              ...state,
              currencyHistory: action.currencyHistory
            }
        default: 
            return state;
    }
}

export default reducer;