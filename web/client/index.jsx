import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './components/root';
import createStore from './stores/store';
import {userToken,loginUserSuccess} from './actions/auth';
import autoLogin from './components/autoLogin';

require("font-awesome-webpack");
//require("./css/index.css");

injectTapEventPlugin();

const store = createStore(window.__INITIAL_STATE__);
let token = userToken();
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
} else {
    autoLogin(store.dispatch);
}

render((<Root store={store} />), document.getElementById('content'));
