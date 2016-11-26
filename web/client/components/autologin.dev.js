import {login} from '../actions/auth';


export default function(dispatch) {
    login('joe','go')(dispatch);
}
