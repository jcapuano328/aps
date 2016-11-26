import types from '../constants/actionTypes';
import grosses from '../services/grosses';
import {toast} from './toast';

export const reload = () => (dispatch,getState) => {
    const {filter,user} = getState();
    return grosses.fetch(filter.start,filter.unit,user.token)
    .then((data) => {        
        dispatch({type: types.SET_GROSSES, value: grosses.groupByPerson(data)});
    })
    .catch((err) => {
        console.error(err);
        toast(err.message || err)(dispatch);
    });
}
