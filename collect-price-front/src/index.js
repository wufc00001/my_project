import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configStroe from './store'
import './index.less';
import Router from './router'; 

const store = configStroe();

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);  
