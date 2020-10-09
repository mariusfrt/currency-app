import {
    UI_START_LOAD_CURRENCY_LIST, 
    UI_STOP_LOAD_CURRENCY_LIST,
    UI_START_LOAD_CURRENCY_HISTORY,
    UI_STOP_LOAD_CURRENCY_HISTORY,
    UI_SET_IS_OFFLINE
} from '../actions/actionTypes';

const initialState = {
    isCurrencyHistoryLoading: false,
    isCurrencyListSilentLoading: false,
    isOffline: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case UI_START_LOAD_CURRENCY_LIST:
            return {
                ...state,
                isCurrencyListSilentLoading: true
            }
        case UI_STOP_LOAD_CURRENCY_LIST:
            return {
                ...state,
                isCurrencyListSilentLoading: false
            }
        case UI_START_LOAD_CURRENCY_HISTORY:
            return {
                ...state,
                isCurrencyHistoryLoading: true
            }
        case UI_STOP_LOAD_CURRENCY_HISTORY:
            return {
                ...state,
                isCurrencyHistoryLoading: false
            }
        case UI_SET_IS_OFFLINE:
            return {
                ...state,
                isOffline: action.isOffline
            }
        default: 
            return state;
    }
}

export default reducer;