import React from 'react';
import {render} from 'react-dom';
import { browserHistory, IndexRoute, Router, Route } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {IntlProvider, addLocaleData} from 'react-intl';

require("font-awesome-webpack");
require("./css/index.css");

injectTapEventPlugin();

import App from './components/app';
import Home from './views/home';
import Login from './views/login';
import Logout from './views/logout';
import About from './views/about';
import Users from './views/users';
import UserDetail from './views/userDetail';
import UserProfile from './views/userProfile';

/*if ('ReactIntlLocaleData' in window) {
    Object.keys(ReactIntlLocaleData).forEach((lang) => {
        addLocaleData(ReactIntlLocaleData[lang]);
    });
}*/

let intlData = {
    "locale": "en",
    "formats": {
        "date": {
            "day": "numeric",
            "month": "numeric",
            "year": "numeric"
        },
        "number": {
            "USD": {
                "style": "currency",
                "currency": "USD",
                "minimumFractionDigits": 2
            },
            "percentage": {
                "style": "percent"
            }
        }
    }
};

render((
    <IntlProvider {...intlData}>
      <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
            <Route path="about" component={About} />
            {/*<Route path="userprofile" component={UserProfile} />
            <Route path="users" component={Users}/>
            <Route path="users/user/:userId" component={UserDetail} />*/}
          </Route>
      </Router>
    </IntlProvider>
), document.getElementById('content'));
