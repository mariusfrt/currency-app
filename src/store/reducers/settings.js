import { 
  SET_SELECTED_BASE_CURRENCY, 
  SET_SELECTED_TIME_INTERVAL 
} from '../actions/actionTypes';

const initialState = {
  selectedBaseCurrency: null,
  selectedTimeInterval: null
}

const reducer = (state = initialState, action) => {    
    switch(action.type){        
        case SET_SELECTED_BASE_CURRENCY:            
            return {
              ...state,
              selectedBaseCurrency: action.selectedBaseCurrency
            }  
        case SET_SELECTED_TIME_INTERVAL:            
            return {
              ...state,
              selectedTimeInterval: action.selectedTimeInterval
            }  
        default: 
            return state;
    }
}

export default reducer;