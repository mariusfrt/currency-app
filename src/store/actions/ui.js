import {
    UI_START_LOAD_CURRENCY_LIST, 
    UI_STOP_LOAD_CURRENCY_LIST,
    UI_START_LOAD_CURRENCY_HISTORY,
    UI_STOP_LOAD_CURRENCY_HISTORY,
    UI_SET_IS_OFFLINE
} from './actionTypes';

export const uiStartLoadCurrencyList = () => {
    return {
        type: UI_START_LOAD_CURRENCY_LIST
    };
}

export const uiStopLoadCurrencyList = () => {
    return {
        type: UI_STOP_LOAD_CURRENCY_LIST,
    };
}

export const uiStartLoadCurrencyHistory = () => {
    return {
        type: UI_START_LOAD_CURRENCY_HISTORY
    };
}

export const uiStopLoadCurrencyHistory = () => {
    return {
        type: UI_STOP_LOAD_CURRENCY_HISTORY,
    };
}

export const uiSetIsOffline = isOffline => {
    return {
        type: UI_SET_IS_OFFLINE,
        isOffline
    };
}