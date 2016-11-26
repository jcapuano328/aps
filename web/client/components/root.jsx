import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../services/muitheme';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import { Provider } from 'react-redux';
import {IntlProvider, addLocaleData} from 'react-intl';
import intlData from '../constants/international';

/*if ('ReactIntlLocaleData' in window) {
    Object.keys(ReactIntlLocaleData).forEach((lang) => {
        addLocaleData(ReactIntlLocaleData[lang]);
    });
}*/

let Root = React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },
    render () {
        return (
            <Provider store={this.props.store}>
                <IntlProvider {...intlData}>
                    <MuiThemeProvider muiTheme={muiTheme}>
                      <Router history={browserHistory}>
                        {routes}
                      </Router>
                    </MuiThemeProvider>
                </IntlProvider>
            </Provider>
        );
    }
});


export default Root;
