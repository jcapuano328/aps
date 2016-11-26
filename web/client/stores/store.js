import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/*  the "store" will look like so:
    {
        user: { // the logged in user
            loggedin: bool,
            firstname: string,
            lastname: string,
            email: string,
            roles: {},
            token: string
        },
        toast: {
            active: bool,
            message: string,
            duration: integer
        },
        users: [],  // the list of managed users (admin feature)
        employees: [], // the list of managed employees
        filter: {   // the filter for grosses
            start: datetime,
            unit: string,
            units: []
            refresh: bool
        },
        grosses: [] // the list of managed grosses
    }
*/

export default (initialState) => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
      const createLogger = require(`redux-logger`);
      const logger = createLogger();
      middlewares.push(logger);
    }
    const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer, initialState);

    if (module.hot) {
        module.hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index');
                store.replaceReducer(nextRootReducer);
            });
    }

    return store;
}
