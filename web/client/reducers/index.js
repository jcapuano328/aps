import { combineReducers } from 'redux';
import toast from './toast';
import auth from './auth';
import filter from './filter';
import grosses from './grosses';

module.exports = combineReducers({
    toast: toast,
    user: auth,
    filter: filter,
    grosses: grosses
});
