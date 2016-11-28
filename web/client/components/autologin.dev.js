import {login} from '../actions/user';


export default function(dispatch) {
    login('joe','go')(dispatch);
}
