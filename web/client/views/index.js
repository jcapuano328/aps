/* i dunno, re-export doesn't want to work for me...
export {Home} from './home';
export {Login} from './login';
export {Logout} from './logout';
export {About} from './about';
export {Users} from './users';
export {UserDetail} from './userDetail';
export {UserProfile} from './userProfile';
*/
import Home from './home';
import Login from './login';
import Logout from './logout';
import About from './about';
import Users from './users';
import UserDetail from './userDetail';
import UserProfile from './userProfile';

module.exports = {
    Home: Home,
    Login: Login,
    Logout: Logout,
    About: About,
    Users: Users,
    UserDetail: UserDetail,
    UserProfile: UserProfile
};
