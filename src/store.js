import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'react-router-redux'
import {createBrowserHistory} from "history";

import rootReducer from './reducers/index';
export const history = createBrowserHistory();

const persistConfig = {
    key: 'authType',
    storage: storage,
    blacklist: [rootReducer] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

const middleware = routerMiddleware(history);

const getMiddleware = () => {
        return applyMiddleware(middleware,  createLogger(), thunk)
    };

const store = createStore(pReducer, getMiddleware());
const persist = persistStore(store);

export {persist, store}
