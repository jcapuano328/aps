import { combineReducers } from 'redux';
import toast from './toast';
import user from './user';
import filter from './filter';
import grosses from './grosses';

module.exports = combineReducers({
    toast: toast,
    user: user,
    filter: filter,
    grosses: grosses
});
