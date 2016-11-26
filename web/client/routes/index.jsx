import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/app';
import {Home,Login,Logout,About/*,Users,UserDetail,UserProfile*/} from '../views';

export default(
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      {/*<Route path="userprofile" component={UserProfile} />
      <Route path="users" component={Users}/>
      <Route path="users/user/:userId" component={UserDetail} />*/}
    </Route>
);
