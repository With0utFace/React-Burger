import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import burgerReducer from './Store/reducers/burger';
import ordersReducer from './Store/reducers/orders';
import authReducer from './Store/reducers/auth';
import App from './Containers/App/App';

import './index.css';

const reducers = combineReducers({
    burger: burgerReducer,
    orders: ordersReducer,
    auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
