import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './reducers/ui';
import currenciesReducer from './reducers/currencies';
import settingsReducer from './reducers/settings';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    currencies: currenciesReducer,
    settings: settingsReducer,
    ui: uiReducer
});

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;
if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;